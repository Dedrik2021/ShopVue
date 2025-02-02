<template>
	<header class="header">
		<div>
			<b-navbar
				class="navbar-dark"
				bg="dark"
				aria-expanded="lg"
				variant="dark"
				collapse-on-select
			>
				<div class="container d-flex justify-content-between">
					<router-link class="navbar-brand" vue-transition to="/?page=1"
						>PROSHOP</router-link
					>

					<!-- <b-collapse id="nav-collapse" is-nav> -->
					<b-navbar-nav class="d-row align-items-center">
						<router-link
							:class="{ disabled: $route.path === '/cart' }"
							class="navbar-brand position-relative mx-4"
							vue-transition
							to="/cart"
							><i class="fas fa-shopping-cart"></i>
							<span
								class="position-absolute top-10 py-0 px-1 start-100 translate-middle badge rounded-pill bg-danger"
								v-if="filteredCartItems.length"
								>{{ filteredCartItems.length }}</span
							></router-link
						>

						<div v-if="user.token">
							<b-dropdown id="dropdown-1" text="Profile" class=" ">
								<b-dropdown-item>Dashboard</b-dropdown-item>
								<b-dropdown-item>{{ user.username }}</b-dropdown-item>
								<b-dropdown-divider></b-dropdown-divider>
								<b-dropdown-item>
									<button @click="logout" type="button" class="btn btn">
										Logout
									</button>
								</b-dropdown-item>
							</b-dropdown>
						</div>

						<router-link
							v-else
							:class="{ disabled: $route.path === '/login' }"
							class="navbar-brand"
							vue-transition
							to="/login"
						>
							<i class="fas fa-user"></i> Login</router-link
						>
					</b-navbar-nav>
					<!-- </b-collapse> -->
				</div>
			</b-navbar>
		</div>
	</header>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
export default {
	name: 'HeaderComponent',

	computed: {
		...mapGetters(['cartItems', 'error', 'user']),

		filteredCartItems() {
			return this.cartItems.filter((item) => item?.username === this.user?.username);
		}
	},

	methods: {
		...mapActions(['clearError', 'logoutUser']),
		...mapMutations(['setCartItems', 'setUser']),

		async logout() {
			await this.logoutUser();
			this.$router.push('/?page=1');
		},

		loadCartItems() {
			const cartItemsStorage = JSON.parse(localStorage.getItem('cartItems')) || [];
			const cart = cartItemsStorage.filter((item) => item?.username === this.user?.username);
			this.setCartItems(cart);
		},
	},

	mounted() {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfo) {
			this.setUser(userInfo);
		}

		this.loadCartItems();
	},

	watch: {
		error(newError) {
			if (newError) {
				setTimeout(() => {
					this.clearError();
				}, 3000);
			}
		},

		user(newUser) {
			if (newUser) {
				this.loadCartItems();
			}
		},
	},
};
</script>

<style scoped>
.header {
	background-color: #343a40; /* Bootstrap dark background color */
	color: white !important; /* Text color */
}

.navbar-dark .navbar-brand,
.navbar-dark .nav-link {
	color: white !important; /* Ensure text color is white */
	border-bottom: 1px solid transparent;
	transition: border-bottom-color 0.3s ease;
}

.navbar-brand:hover {
	border-bottom-color: #fff;
}

.disabled {
	pointer-events: none;
	color: #6c757d !important;
}
</style>
