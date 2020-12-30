export default {
	props: ["list"],
	template: /*html*/`
		<table class="table table-striped table-condensed">
			<thead>
				<tr>
					<th>Name</th>
					<th>User</th>
					<th>description</th>
					<th>Parts</th>
					<th>Size</th>
					<th>Changed</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="entry in list" v-bind:class="{ 'table-danger': !entry.complete }">
					<td>
						<router-link :to="{ name: 'schemapage', params: { schema_name: entry.name, user_name: entry.user.name }}">
							{{ entry.name }}
						</router-link>
					</td>
					<td>{{ entry.user.name }}</td>
					<td>{{ entry.description }}</td>
					<td>
						{{ entry.total_parts }}
						<span v-if="!entry.complete" class="badge badge-danger">
							Incomplete
						</span>
					</td>
					<td>{{ entry.total_size | prettysize }}</td>
					<td>{{ new Date(+entry.created).toDateString() }}</td>
				</tr>
			</tbody>
		</table>
	`
};
