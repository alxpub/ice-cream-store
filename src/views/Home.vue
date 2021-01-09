<template>
	<div>
		<p>
			Lorem ipsum dolor sit amet consectetur, adipisicing elit.
			Quam deserunt aliquam accusamus expedita magni rerum esse consequatur
			dolorum incidunt pariatur nobis sapiente hic libero voluptatibus,
			cupiditate qui ipsam magnam enim!<br>
			Natus accusamus, consectetur voluptatum, iusto quis quidem possimus perferendis distinctio nam,
			similique soluta culpa cumque ea voluptates quam modi voluptas unde cum perspiciatis laborum?
			Ea ut dolore quod architecto tempore.
		</p>
		<div>
			<SearchBox :products="products" @perform-search="performSearch($event)" />
		</div>
		<div class="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
			<div v-for="item in getProducts" :key="item.id" class="col">
				<div class="card">
					<img :src="publicPath + item.thumb" class="card-img-top">
					<div class="card-body">
						<h5 class="card-title">
							<router-link :to="{name:'details', params:{productId:item.id }}">
								{{ item.title }}
							</router-link>
						</h5>
						<p class="card-text">{{ item.summary }}</p>
						<p class="card-text">Price: {{ item.price }}$</p>
						<button @click="addToCart(item.id)" class="btn btn-primary">Add to cart</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import SearchBox from '@/components/SearchBox.vue';
import { mapGetters } from 'vuex';

export default {
	name: 'Home',
	props: ["products"],
	data() {
		return {
			publicPath: process.env.BASE_URL
		}
	},
	methods: {
		addToCart: function (item_id) {
			this.$store.commit({
				type: 'addToCart',
				item_id: item_id
			});
		},

		performSearch: function (searchText) {
			this.$router.push({
				name: 'search',
				params: { searchText: searchText, products: this.products }
			});
		}
	},
	computed: {
		...mapGetters(['getProducts'])
	},
	components: {
		SearchBox
	}
}
</script>
