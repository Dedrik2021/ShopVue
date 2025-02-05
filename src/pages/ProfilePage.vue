<template>
	<div>
		<div class="container">
			<div class="d-flex">
				<div class=" me-5 profile">
					<h2>Profile</h2>
					<div>
						<message-vue v-if="error || message" :message="error || message" :type="error ? 'danger' : 'success'" />

						<div class="login-page">
							<form @submit.prevent="submitHandler" class="shadow p-3 rounded">
								<div class="form-group mb-2" >
									<label for="name">Name</label>
									<input
										type="text"
										class="form-control"
										id="name"
										v-model="name"
									/>
								</div>
								<div class="form-group mb-2">
									<label for="email">Email address</label>
									<input
										type="email"
										class="form-control"
										id="email"
										v-model="email"
									/>
								</div>
								<div class="form-group mb-3">
									<label for="password">Password</label>
									<input
										type="password"
										class="form-control"
										id="password"
										v-model="password"
									/>
								</div>
								<div class="form-group mb-3">
									<label class="label" for="confirm-password ">Confirm Password</label>
									<input
										type="password"
										class="form-control"
										id="confirm-password"
										v-model="confirmPassword"
									/>
								</div>
                                <button
                                    type="submit"
                                    :disabled="status === 'pending' || userChanged"
                                    class="btn btn-primary"
                                >
                                    <pulse-loader
                                        v-if="status === 'pending'"
                                        :loading="status === 'pending'"
                                        :color="'#fff'"
                                        :size="'8px'"
                                    ></pulse-loader>
                                    <span v-else>Update</span>
                                </button>
								
							</form>
						</div>
					</div>
				</div>
				<div class="w-50">
					<h2>My Orders</h2>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import MessageVue from '@/components/MessageVue.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
	name: 'ProfilePage',

    components: {
        MessageVue,
		PulseLoader
    },

	data() {
		return {
			email: '',
			name: '',
			password: '',
			confirmPassword: '',
			message: '',
		};
	},

	computed: {
		...mapGetters(['userInfo', 'user', 'error', 'status']),

		userChanged() {
			return this.name === this.userInfo.name && this.email === this.userInfo.email && this.password === '';
		}
	},

	methods: {
		...mapActions(['getUserInfo', 'updateProfile']),

		async submitHandler() {
			if (this.password !== this.confirmPassword) {
				this.message = 'Passwords do not match';
			} else {

				if (this.user.name !== this.name || this.user.email !== this.email || this.password !== '') {
					await this.updateProfile({ name: this.name, email: this.email, password: this.password, token: this.user.token });
					this.password = '';
					this.confirmPassword = '';
					this.message = 'Profile has been updated';
				} else {
					this.message = 'No changes were made';
				}
			}
		},
	},

	mounted() {
		if (!this.userInfo) {
			this.$router.push('/login');
		} else {
			if (!this.user || !this.user.name) {
				this.getUserInfo();
			} else {
				this.name = this.user.name;
				this.email = this.user.email;
			}
		}
	},

	watch: {
		message() {
			if (this.message) {
				setTimeout(() => {
					this.message = '';
				}, 3000);
			}
		},

		error() {
			if (this.error) {
				setTimeout(() => {
					this.error = '';
				}, 3000);
			}
		},
	},
};
</script>

<style scoped>
label {
	font-size: 13px;
}

.profile {
	max-width: 400px;
	width: 100%;
}
</style>
