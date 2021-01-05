const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const logger = require("../logger");

const events = require("../events");

const app = require("../app");
const schema_dao = require("../dao/schema");
const collection_schema_dao = require("../dao/collection_schema");
const user_schema_star_dao = require("../dao/userschemastar");

const { UPLOAD } = require("../permissions");
const tokenmiddleware = require("../middleware/token");
const permissioncheck = require("../middleware/permissioncheck");

app.post('/api/schema', tokenmiddleware, permissioncheck(UPLOAD), jsonParser, async function(req, res){
	logger.debug("POST /api/schema", req.body);

	const existing_schema = await schema_dao.get_by_schemaname_and_username(req.body.name, req.claims.username);
	if (existing_schema) {
		return res.status(405).json({ message: "Schema already exists" });
	}

	if (req.body.replaces){
		const replaces_schema = await schema_dao.get_by_schemaname_and_username(req.body.replaces, req.claims.username);
		if (!replaces_schema){
			return res.status(403).json({ message: "Schema to replace not found" });
		}
	}

	const inserted_data = await schema_dao.create({
		user_id: +req.claims.user_id,
		name: req.body.name,
		replaces: req.body.replaces,
		description: req.body.description,
		max_x: req.body.max_x,
		max_y: req.body.max_y,
		max_z: req.body.max_z,
		part_length: req.body.part_length,
		license: req.body.license
	});
	res.json(inserted_data);
});



app.post('/api/schema/:id/complete', tokenmiddleware, permissioncheck(UPLOAD), jsonParser, async function(req, res){
	logger.debug("POST /api/schema/id/complete", req.params.id, req.body);

	const schema = await schema_dao.get_by_id(req.params.id);

	// check user id in claims
	if (schema.user_id != +req.claims.user_id){
		return res.status(401).end();
	}

	// check if already completed
	if (schema.complete){
		return res.status(500).end();
	}

	await schema_dao.finalize(schema.id);

	if (req.body.replaces){
		//uploaded schema replaces existing schema
		const replaces_schema = await schema_dao.get_by_schemaname_and_username(req.body.replaces, req.claims.username);

		if (replaces_schema){
			// rewire stars to new schema_id
			user_schema_star_dao.change_schemaid(replaces_schema.id, schema.id);
			// rewire collection_schema to new schema id
			collection_schema_dao.change_schemaid(replaces_schema.id, schema.id);

			// archive old schema
			schema_dao.archive_by_id(replaces_schema.id);

			// rename old/new schema
			schema.name = replaces_schema.name;
			replaces_schema.name = "replaced_" + Math.random().toString(36).substring(2, 8).toUpperCase();
			schema_dao.update(replaces_schema);
			schema_dao.update(schema);

		} else {
			// to-replace schema vanished, leave it as-is
		}
	}

	res.end();
	events.emit("new-schema", schema);
});
