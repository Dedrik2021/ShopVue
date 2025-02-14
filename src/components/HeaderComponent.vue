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
							:to="userLoggedIn ? '/cart' : '/login'"
							><i class="fa fa-shopping-cart"></i>
							<span
								class="position-absolute top-10 py-0 px-1 start-100 translate-middle badge rounded-pill bg-danger"
								v-if="cartItemsLength"
								>{{cartItemsLength }}</span
							></router-link
						>

						<div v-if="user.token">
							<b-dropdown id="dropdown-1" :text="username" class=" ">
								<b-dropdown-item>Dashboard</b-dropdown-item>
								<b-dropdown-item>
									<router-link class="btn" to="/profile">{{
										username
									}}</router-link>
								</b-dropdown-item>
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
import { capitalize } from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
export default {
	name: 'HeaderComponent',

	data() {
		return {
			lastLocation: '',
		};
	},

	computed: {
		...mapGetters(['cartItems', 'error', 'user', 'userInfo']),

		username() {
			return capitalize(this.user.username).split('@')[0];
		},

		userLoggedIn() {
			return !!this.user.token;
		},

		cartItemsLength() {
			return this.$store.state.cart.cartItems.length;
		}
	},

	methods: {
		...mapActions(['clearError', 'logoutUser', 'getUserInfo']),
		...mapMutations(['setCartItems', 'setUser', 'setLastLocation', 'setCart']),

		async logout() {
			await this.logoutUser();
			this.$router.push('/?page=1');
		},

		getLastLocation(path) {
			localStorage.setItem('lastLocation', path);
			this.lastLocation = localStorage.getItem('lastLocation');
			this.setLastLocation(this.lastLocation);
		},
	},

	mounted() {
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));
		if (userInfo) {
			this.setUser(userInfo);
		}

		if (this.user && this.user.name) {
			this.getUserInfo();
		}

		this.setCart()
	},

	watch: {
		error(newError) {
			if (newError) {
				setTimeout(() => {
					this.clearError();
				}, 3000);
			}
		},

		$route(to, from) {
			if (from.path !== this.lastLocation) {
				console.log(from);
				console.log(to);
				this.getLastLocation(from.path);
			}
		},

		user(newUser) {
			if (newUser) {
				this.setCart();
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
