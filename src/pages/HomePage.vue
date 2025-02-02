<template>
	<div>
		<div class="d-flex justify-content-center">
			<loader-vue v-if="status === 'pending'" />
			<div v-else>
				<products-vue :products="products" />
			</div>
		</div>

		<message-vue v-if="error" :message="error" :type="'danger'" />

		<nav aria-label="Page navigation" v-if="status !== 'pending' && pagination.totalPages > 1">
			<ul class="pagination justify-content-center">
				<li
					class="page-item page-item--prev"
					:class="{ disabled: pagination.currentPage === 1 }"
				>
					<router-link
						class="page-link"
						:to="{ query: { page: pagination.currentPage - 1 } }"
						@click.prevent="changePage(pagination.currentPage - 1)"
						>Previous</router-link
					>
				</li>
				<li
					class="page-item"
					v-for="page in pagination.totalPages"
					:key="page"
					:class="{ active: page === pagination.currentPage }"
				>
					<router-link
						class="page-link"
						:to="{ query: { page: page } }"
						@click.prevent="changePage(page)"
						>{{ page }}</router-link
					>
				</li>
				<li
					class="page-item page-item--next"
					:class="{ disabled: pagination.currentPage === pagination.totalPages }"
				>
					<router-link
						class="page-link"
						:to="{ query: { page: pagination.currentPage + 1 } }"
						@click.prevent="changePage(pagination.currentPage + 1)"
						>Next</router-link
					>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductsVue from '../components/ProductsVue.vue';
import LoaderVue from '@/components/LoaderVue.vue';
import MessageVue from '../components/MessageVue.vue';

export default {
	components: {
		ProductsVue,
		LoaderVue,
		MessageVue,
	},
	name: 'HomePage',

	computed: {
		...mapGetters(['allProducts', 'pagination', 'error']),
		products() {
			return this.allProducts;
		},

		status() {
			return this.$store.state.status;
		},

		error() {
			return this.$store.state.error;
		},

		pageMethod() {
			return this.$route.query.page
		},
	},
	methods: {
		...mapActions(['fetchProducts', 'setCurrentPage', 'clearError']),
		changePage(page) {
			localStorage.setItem('currentPage', page);
			this.setCurrentPage(page);
			this.$router.push({ query: { page: page } });
		},
	},
	async mounted() {
		const page = this.$route.query.page ? parseInt(this.pageMethod) : +localStorage.currentPage || 1;
		await this.setCurrentPage(page);
		await this.fetchProducts();

		// if (+localStorage.currentPage) {
		// 	this.$router.push({ query: { page: +localStorage.currentPage } });
		// 	this.setCurrentPage(+localStorage.currentPage);
		// }
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.page-item--next {
	margin-left: 5px;
}

.page-item--prev {
	margin-right: 5px;
}
</style>
