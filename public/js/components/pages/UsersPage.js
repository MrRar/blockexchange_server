import { get } from '../../api/user.js';
import Pager from '../Pager.js';

export default {
	components: {
		"pager-component": Pager
	},
	data: function(){
		return {
			userdata: null,
			total: null
		};
	},
	methods: {
		fetchData: function(limit, offset) {
			console.log("fetchData", limit, offset);
			get(limit, offset)
			.then(userdata => {
				this.userdata = userdata;
				this.total = userdata.total;
			});
		}
	},
	template: /*html*/`
		<div>
			<pager-component :total="total" v-on:fetchData="fetchData" :limit="20" :route="$route">
			</pager-component>
			<table class="table table-condensed table-striped">
				<thead>
					<tr>
						<th>Name</th>
						<th>Created</th>
						<th>Type</th>
						<th>Role</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="user in userdata.list" v-if="userdata">
						<td>{{ user.name }}</td>
						<td>{{ new Date(+user.created).toDateString() }}</td>
						<td>{{ user.type }}</td>
						<td>{{ user.role }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	`
};
