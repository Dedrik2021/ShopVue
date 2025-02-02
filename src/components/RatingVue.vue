<template>
	<div class="rating">
		<div class="d-flex align-items-center">
			<div class="">
				<span v-for="star in 5" :key="star">
					<i :style="{ color: color }" :class="getStarClass(star)"></i>
				</span>
			</div>
			<span>{{ text && text }}</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'RatingVue',

	props: {
		value: {
			type: String,
		},
		text: {
			type: String,
		},
		color: {
			type: String,
		},
	},

	methods: {
		getStarClass(star) {
			if (this.value >= star) {
				return 'fas fa-star';
			} else if (this.value >= star - 0.5) {
				return 'fas fa-star-half-alt';
			} else {
				return 'far fa-star';
			}
		}
	},
};
</script>

<style scoped>
span {
	margin: 0.1rem;
}
</style>
