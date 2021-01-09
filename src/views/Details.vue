<template>
	<div>
		<h2>{{ product.title }}</h2>

		<div class="card">
			<div class="row g-0">
				<div class="col-md-4">
					<img :src="publicPath + product.thumb">
				</div>
				<div class="col-md-8">
					<div class="card-body">
						<p class="card-text">{{ product.desc }}</p>
						<p class="card-text">Price: {{ product.price }}$</p>
						<button @click="addToCart(product.id)" class="btn btn-primary">Add to cart</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Details',
	props: ["productId"],
	data() {
		return {
			publicPath: process.env.BASE_URL,
			product: null
		}
	},
	methods: {
		addToCart: function (item_id) {
			this.$store.commit({
				type: 'addToCart',
				item_id: item_id
			});
		}
	},
	created() {
		this.product = this.$store.getters.getProductById(this.productId);
	}
}
</script>

<style scoped>
img {
	width: 100%;
}
</style>