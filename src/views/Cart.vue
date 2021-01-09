<template>
	<div>
		<h2>Cart</h2>

		<div v-if="ordered">
			Thank you for ordering ice cream!<br />
			Have a nice day!
		</div>
		<div v-else>
			<div v-if="getCartCount == 0">No products in the cart</div>
			<div v-for="item in getProductsInCart" :key="item.id" class="row mb-1 border p-1 align-items-center">
				<div class="col col-12 col-sm-6 col-md-1">
					<img :src="publicPath + item.thumb">
				</div>

				<div class="w-100 d-sm-none my-1"></div>

				<div class="col col-12 col-sm-6 col-md align-middle">{{ item.title }}</div>
				
				<div class="w-100 d-md-none my-1"></div>
				
				<div class="col col-md-3 col-lg-2">
					<div class="input-group mb-3">
						<button @click="decProdInCart(item.id)" class="btn btn-outline-secondary" type="button">-</button>
						<input type="text" class="form-control text-center" :value="item.amount" readonly />
						<button @click="incProdInCart(item.id)" class="btn btn-outline-secondary" type="button">+</button>
					</div>
				</div>

				<div class="w-100 d-sm-none my-1"></div>

				<div class="col col-md-3">{{ item.price_total }}$ ({{ item.price }}$ for one)</div>
				<div class="col col-3 col-md-2">
					<button @click="removeFromCart(item.id)" type="button" class="btn btn-outline-danger">X</button>
				</div>
			</div>
			<div v-if="getCartCount > 0" class="row mt-1 mb-1 p-1">
				<div class="col text-end">Total:</div>
				<div class="col col-3"> {{ getCartTotal }}$</div>
				<div class="col col-4 col-md-3 col-lg-2">
					<button @click="orderNow()" type="button" class="btn btn-info">Order</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'Cart',
	data() {
		return {
			publicPath: process.env.BASE_URL,
			ordered: false
		};
	},
	methods: {
		incProdInCart: function (item_id) {
			this.$store.commit({
				type: 'incProdInCart',
				item_id: item_id
			});
		},
		decProdInCart: function (item_id) {
			this.$store.commit({
				type: 'decProdInCart',
				item_id: item_id
			});
		},
		removeFromCart: function (item_id) {
			this.$store.commit({
				type: 'removeFromCart',
				item_id: item_id
			});
		},
		orderNow: function () {
			this.ordered = true;
			this.$store.commit('clearCart');
		}
	},
	computed: {
		...mapGetters(['getProductsInCart','getCartCount','getCartTotal'])
	}
}
</script>

<style scoped>
.amount {
	width: 20px;
}
img {
	width: 100%;
}
</style>