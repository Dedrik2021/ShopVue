<template>
	<div>
		<message-vue v-if="error" :message="error" :type="'danger'" />
		
		<div class="login-page">
			<h2>{{ $route.path === '/login' ? 'Login' : 'Register' }}</h2>
			<form @submit.prevent="$route.path === '/login' ? handleLogin() : handleRegister()">
				
				<input-form v-if="$route.path === '/register'" label="Name" name="name" v-model="name" />

				<input-form label="Email" name="email" type="email" v-model="email" />

				<input-form label="Password" margin-bottom="20px" name="password" type="password" v-model="password" />

		
				<div class="d-flex align-items-center " v-if="$route.path === '/login'">
					<button type="submit" :disabled="status === 'pending'" class="btn btn-primary">
						<pulse-loader v-if="status === 'pending'" :loading="status === 'pending'" :color="'#fff'" :size="'8px'"></pulse-loader>
						<span v-else>Login</span>
					</button>
					<div class="mx-3">
						Don't have an account?
						<router-link @click="clearItems" to="/register" class=" ">Register</router-link>
					</div>
				</div>
				<div class="d-flex align-items-center " v-else>
					<button type="submit" class="btn btn-danger">
						<pulse-loader v-if="status === 'pending'" :loading="status === 'pending'" :color="'#fff'" :size="'8px'"></pulse-loader>
						<span v-else>Register</span>
					</button>
					<div class="mx-3">
						Already have an account?
						<router-link @click="clearItems" to="/login" class="">Login</router-link>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import MessageVue from '@/components/MessageVue.vue';
import InputForm from '@/components/InputForm.vue';

export default {
	name: 'LoginPage',

	components: {
		MessageVue,
		PulseLoader,
		InputForm

	},

	data() {
		return {
			name: '',
			email: '',
			password: '',
		};
	},

	computed: {
		...mapGetters([ 'error', 'status', 'lastLocation', 'user' ]),
	},

	methods: {
		...mapActions(['registerUser', 'loginUser']),
		async handleRegister() {
			await this.registerUser({ name: this.name, email: this.email, password: this.password });

			if (this.error) return
			await this.clearItems();
			this.$router.push('/login');
		},

		async handleLogin() {
			await this.loginUser({ username: this.email, password: this.password });
			if (this.error) return
			await this.clearItems();
			this.$router.push(this.lastLocation ? this.lastLocation !== '/login' && this.lastLocation !== '/register' ? this.lastLocation : '/?page=1' : '/?page=1');
		},

		clearItems() {
			this.name = '';
			this.email = '';
			this.password = '';
		},

		ifLoggedIn() {
			if (this.user && this.user.name) {
				this.$router.push('/?page=1');
			}
		},
	},

	mounted() {
		this.ifLoggedIn();
	}
};
</script>

<style scoped>
.login-page {
	max-width: 400px;
	margin: 50px auto;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 5px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.disabled {
	pointer-events: none;
	color: #6c757d !important;
}
</style>
