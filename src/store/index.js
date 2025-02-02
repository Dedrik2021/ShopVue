import { createStore } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const store = createStore({
	state: {
		products: [],
		product: {},
		status: 'success',
		error: null,
		user: {},
		cartItems: [],
		infoMessage: null,
		pagination: {
			currentPage: 1,
			totalPages: 1,
			pageSize: 4,
		},
	},
	actions,
	mutations,
	getters,
});

export default store;
