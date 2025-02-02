import axios from 'axios';

const url = process.env.VUE_APP_API_URL;

const config = {
	headers: {
		'Content-Type': 'application/json',
	},
};

export default {
	async registerUser({ commit }, data) {
		commit('setStatus', 'pending');
		try {
			await axios.post(`${url}users/register/`, data);
			commit('setUser', data);
			commit('setStatus', 'success');
		} catch (error) {
			commit('setError', `${error.response.data.detail}. Try again.`);
			console.error(error);
		} finally {
			commit('setStatus', 'success');
		}
	},
	async loginUser({ commit }, data) {
		commit('setStatus', 'pending');
		try {
			const response = await axios.post(`${url}users/token/`, data, config);
			await localStorage.setItem('userInfo', JSON.stringify(response.data));
			commit('setUser', response.data);
			commit('setStatus', 'success');
		} catch (error) {
			commit('setError', `${error.response.data}. Try again.`);
			console.error(error);
		} finally {
			commit('setStatus', 'success');
		}
	},
	async fetchProducts({ commit, state }) {
		commit('setStatus', 'pending');
		try {
			const response = await axios.get(`${url}products/`, {
				params: {
					page: state.pagination.currentPage,
					page_size: state.pagination.pageSize,
				},
			});
			commit('setProducts', {
				products: response.data.results,
				totalPages: Math.ceil(response.data.count / state.pagination.pageSize),
			});
			commit('setStatus', 'success');
		} catch (error) {
			commit('setError', `${error.message}. Not Found.`);
			console.error(error);
		} finally {
			commit('setStatus', 'success');
		}
	},
	async fetchProductById({ commit }, id) {
		commit('setStatus', 'pending');
		try {
			const response = await axios.get(`${url}products/${id}/`);
			commit('setProduct', response.data);
			commit('setStatus', 'success');
		} catch (error) {
			commit('setError', `${error.message}. Not Found.`);
			console.error(error);
		} finally {
			commit('setStatus', 'success');
		}
	},
	async addItemToCart({ commit }, { id, qty, username }) {
		commit('setStatus', 'pending');
		try {
			const response = await axios.get(`${url}products/${id}/`);
			commit('addToCart', { product: response.data, qty, username });
		} catch (error) {
			commit('setError', 'An error occurred while adding to cart.');
			console.error(error);
		} finally {
			commit('setStatus', 'success');
		}
	},
	async removeItemFromCart({ commit }, id) {
		commit('setStatus', 'pending');
		try {
			const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
			const existingItem = cart.find((i) => i._id === id);
			commit('removeFromCart', id);
			commit('setInfoMessage', `${existingItem.name} removed from cart.`);
		} catch (error) {
			commit('setError', `${error.message}. Try again.`);
			console.error(error);
		} finally {
			commit('setStatus', 'success');
		}
	},
	setCurrentPage({ commit, dispatch }, page) {
		commit('setCurrentPage', page);
		dispatch('fetchProducts');
	},
	clearError({ commit }) {
		commit('setError', null);
	},
	logoutUser({ commit }) {
		commit('setUser', {});
		localStorage.removeItem('userInfo');
	},
	clearInfoMessage({ commit }) {
		commit('setInfoMessage', null);
	},
	setUser({ commit }, user) {
		commit('setUser', user);
	},
};
