import SchemaLicense from './SchemaLicense.js';
import prettysize from '../../util/prettysize.js';

export default {
	components: {
		"schema-license": SchemaLicense
	},
	props: ["schema"],
	methods: {
		prettysize: prettysize
	},
	template: /*html*/`
	<ul>
		<li>
			<b>Created: </b>{{ new Date(+schema.created).toISOString() }}
		</li>
		<li>
			<b>Changed: </b>{{ new Date(+schema.mtime).toISOString() }}
		</li>
		<li>
			<b>Size: </b>{{ prettysize(schema.total_size) }}
		</li>
		<li>
			<b>Dimensions: </b>
			{{ schema.size_x }} / 
			{{ schema.size_y }} / 
			{{ schema.size_z }} nodes
		</li>
		<li>
			<b>Parts: </b>{{ schema.total_parts }}
		</li>
		<li>
			<b>Downloads: </b>{{ schema.downloads }}
		</li>
		<li>
			<b>License: </b><schema-license style="display: inline;" :schema="schema"/>
		</li>
	</ul>
	`
};
