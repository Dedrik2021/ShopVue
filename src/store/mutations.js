
export default {
	setUser(state, user) {
		state.user = user;
	},
	setProducts(state, { products, totalPages }) {
		state.products = products;
		state.pagination.totalPages = totalPages;
	},
	setProduct(state, product) {
		state.product = product;
	},
	setCurrentPage(state, page) {
		state.pagination.currentPage = page;
	},
	setStatus(state, status) {
		state.status = status;
	},
	setError(state, error) {
		state.error = error;
	},
	setInfoMessage(state, message) {
		state.infoMessage = message;
	},
	setCartItems(state, cartItems) {
		state.cartItems = cartItems;
	},
	updateQtyItemInCart(state, { id, qty }) {
		const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
        const filteredCart = cart.filter((item) => item.username === state.user.username);
		const existingItem = filteredCart.find((i) => i._id === id);
		if (existingItem) {
			existingItem.qty = parseInt(qty);
		}
		localStorage.setItem('cartItems', JSON.stringify(cart));
		state.cartItems = cart;
	},
	addToCart(state, { product, qty, username }) {
		const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
        const filteredCart = cart.filter((item) => item.username === username);
		const existingItem = filteredCart.find((i) => i._id === product._id);
		if (existingItem) {
			existingItem.qty += parseInt(qty);
		} else {
			cart.push({ ...product, qty: parseInt(qty), username });
		}
		localStorage.setItem('cartItems', JSON.stringify(cart));
		state.cartItems = cart;
	},
	removeFromCart(state, id) {
		const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
		const updateCart = cart.filter((item) => {
			return item._id !== id;
		});
		localStorage.setItem('cartItems', JSON.stringify(updateCart));
		state.cartItems = updateCart;
	},
};
