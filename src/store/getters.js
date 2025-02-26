export default {
	allProducts: (state) => state.products,
	productById: (state) => state.product,
	cartItems: (state) => state.cartItems,
	pagination: (state) => state.pagination,
	status: (state) => state.status,
	error: (state) => state.error,
	infoMessage: (state) => state.infoMessage,
	user: (state) => state.user,
    userInfo: (state) => state.userInfo,
    lastLocation: (state) => state.lastLocation,
    shippingAddress: (state) => state.shippingAddress,
    cart: (state) => state.cart,
    paymentMethod: (state) => state.paymentMethod,
    order: (state) => state.order
};
