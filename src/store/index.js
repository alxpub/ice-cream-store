import Vue from 'vue'
import Vuex from 'vuex'
import products from '@/mocks/products';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		cart: [],
		products: products
	},
	getters: {
		getCartCount: state => {
			return state.cart.length;
		},
		getProducts: state => {
			return state.products;
		},
		getProductsMaxPrice: state => {
			var result = 0;
			for (var i = 0; i < state.products.length; i++) {
				if (state.products[i].price > result) {
					result = state.products[i].price;
				}
			}

			return result;
		},
		getProductById: (state) => (id) => {
			return state.products.find(product => product.id === id);
		},

		getProductsInCart: state => {
			var result = [];
			for (var i = 0; i < state.cart.length; i++) {
				for (var k = 0; k < state.products.length; k++) {
					if (state.cart[i].id == state.products[k].id) {
						var cart_item = Object.assign({}, state.cart[i], state.products[k]);
						cart_item.price_total = cart_item.price * cart_item.amount
						result.push(cart_item);
						break;
					}
				}
			}

			return result;
		},

		getCartTotal: state => {
			var result = 0;

			for (var i = 0; i < state.cart.length; i++) {
				for (var k = 0; k < state.products.length; k++) {
					if (state.cart[i].id == state.products[k].id) {
						result += state.cart[i].amount * state.products[k].price;
						break;
					}
				}
			}

			return result;
		}
	},
	mutations: {
		addToCart (state, payload) {
			var found = false;
			for (var i = 0; i < state.cart.length; i++) {
				if (payload.item_id == state.cart[i].id) {
					if (state.cart[i].amount < 10) {
						state.cart[i].amount++;
					}
					found = true;
					break;
				}
			}

			if (!found) {
				state.cart.push({
					id: payload.item_id,
					amount: 1
				});
			}
			localStorage.cart = JSON.stringify(state.cart);
		},
		
		removeFromCart: function (state, payload) {
			for (var i = 0; i < state.cart.length; i++) {
				if (payload.item_id == state.cart[i].id) {
					state.cart.splice(i, 1); 
					break;
				}
			}
			localStorage.cart = JSON.stringify(state.cart);
		},

		incProdInCart: function (state, payload) {
			for (var i = 0; i < state.cart.length; i++) {
				if (payload.item_id == state.cart[i].id) {
					if (state.cart[i].amount < 10) {
						state.cart[i].amount++;
					}
					break;
				}
			}
			localStorage.cart = JSON.stringify(state.cart);
		},

		decProdInCart: function (state, payload) {
			for (var i = 0; i < state.cart.length; i++) {
				if (payload.item_id == state.cart[i].id) {
					if (state.cart[i].amount > 1) {
						state.cart[i].amount--;
					}
					break;
				}
			}
			localStorage.cart = JSON.stringify(state.cart);
		},

		clearCart: function (state) {
			state.cart.splice(0);
			localStorage.cart = JSON.stringify(state.cart);
		},

		restoreCart(state) {
			state.cart = JSON.parse(localStorage.cart);
		}
	}
})
