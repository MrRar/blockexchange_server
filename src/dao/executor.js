const pool = require("../pool");

module.exports = async function(query, values, options){
	const single_row = options && options.single_row;

	try {
		const sql_res = await pool.query(query, values);
		if (!sql_res.rows || sql_res.rows.length == 0){
			// no result
			return single_row ? null : [];
		}
		return single_row ? sql_res.rows[0] : sql_res.rows;

	} catch (e) {
		console.error(e.stack);
		throw(e);
	}
};
