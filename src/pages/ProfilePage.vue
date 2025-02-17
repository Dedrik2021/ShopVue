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

								<input-form label="Name" name="name" v-model="name" />
								<input-form label="Email Address" type="email" name="email" v-model="email" />
								<input-form label="Password" name="password" type="password" v-model="password" />
								<input-form marginBottom="20px" label="Confirm Password" type="password" name="confirmPassword" v-model="confirmPassword" />

                                <b-button
                                    type="submit"
                                    :disabled="status === 'pending' || userChanged"
                                    class=""
                                >
                                    <pulse-loader
                                        v-if="status === 'pending'"
                                        :loading="status === 'pending'"
                                        :color="'#fff'"
                                        :size="'8px'"
                                    ></pulse-loader>
                                    <span v-else>Update</span>
                                </b-button>
								
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
import { mapGetters, mapActions, mapMutations } from 'vuex';

import MessageVue from '@/components/MessageVue.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import InputForm from '@/components/InputForm.vue';

export default {
	name: 'ProfilePage',

    components: {
        MessageVue,
		PulseLoader,
		InputForm
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
		...mapMutations(['setError']),

		async submitHandler() {
			if (this.password !== this.confirmPassword) {
				this.setError('Passwords do not match');
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
