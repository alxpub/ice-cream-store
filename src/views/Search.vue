<template>
	<div>
		<h2 v-if="searchText">Search for "{{ searchText }}"</h2>
		<div class="card card-body my-3">
			<div class="row">
				<div class="col col-4 col-md-1 col-lg-2">
					<label class="form-label fs-5" for="filter_text">Text</label>
				</div>
				<div class="col col-8 col-md-4 col-lg-3">
					<input type="text" v-model="filter" id="filter_text" class="form-control" /> 
				</div>

				<div class="w-100 d-md-none my-1"></div>
				<div class="d-none d-lg-block col-lg-2"></div>

				<div class="col col-4 col-md-3 col-lg-2">
					<label class="form-label" for="filter_price fs-5">Max price</label>
				</div>
				<div class="col col-8 col-md-4 col-lg-3 d-flex">
					<div class="flex-grow-1"><input type="range" min="0" :max="max_price" v-model="filter_max_price" id="filter_price" class="form-range" style="width:90%;" /></div>
					<div class="align-middle text-center" style="min-width:50px;">{{ filter_max_price }}$</div>
				</div>
			</div>
		</div>

		<div>
			<div class="row">
				<div class="col-3 col-lg-2">Image</div>
				<div class="col-7 col-lg-3">
					<span class="title" @click="sortByTitle" :class="title_class">Title</span>
				</div>
				<div class="col-1 col-lg-2 fs-5">
					<span class="price" @click="sortByPrice" :class="price_class">Price</span>
				</div>
				<div class="col d-none d-lg-block">Summary</div>
			</div>
			<div v-for="item in productsFiltered" :key="item.id" class="row mt-3">
				<div class="col-3 col-lg-2"><img :src="publicPath + item.thumb" class="search-image"></div>
				<div class="col-7 col-lg-3">
					<h6>
						<router-link :to="{name:'details', params:{productId:item.id }}">
							{{ item.title }}
						</router-link>
					</h6>
					<button @click="addToCart(item.id)" class="btn btn-sm btn-primary">Add to cart</button>
				</div>
				<div class="col-1 col-lg-2">{{ item.price }}$</div>
				<div class="col d-none d-lg-block">{{ item.summary }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Search',
	props: ["searchText"],
	data() {
		return {
			publicPath: process.env.BASE_URL,
			products: [],
			filter: '',
			sort_dir: 'desc',
			sort_by: 'title',
			max_price: 50,
			filter_max_price: 50,
			price_class: 'price',
			title_class: 'title'
		}
	},
	methods: {
		addToCart: function (item_id) {
			this.$store.commit({
				type: 'addToCart',
				item_id: item_id
			});
		},

		sortByPrice() {
			if ((this.sort_dir == 'desc') || (this.sort_by != 'price')) {
				this.sort_by = 'price';
				this.sort_dir = 'asc';
				this.price_class = 'price price-sort price-asc';
			} else {
				this.sort_by = 'price';
				this.sort_dir = 'desc';
				this.price_class = 'price price-sort price-desc';
			}
			this.title_class = 'title';
		},

		sortByTitle() {
			if ((this.sort_dir == 'desc') || (this.sort_by != 'title')) {
				this.sort_by = 'title';
				this.sort_dir = 'asc';
				this.title_class = 'title title-sort title-asc';
			} else {
				this.sort_by = 'title';
				this.sort_dir = 'desc';
				this.title_class = 'title title-sort title-desc';
			}
			this.price_class = 'price';
		}
	},
	computed: {
		productsFiltered: function () {
			var filtered = this.products.filter(product => {
				return (product.title.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1)
					&& (
						(product.title.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1)
						|| (product.desc.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1)
						|| (product.summary.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1)
					)
					&& (
						product.price <= this.filter_max_price
					);
			});

			var sorted = filtered.sort((a, b) => {
				if (this.sort_by == "price") {
					if (this.sort_dir == "asc") {
						return (a.price - b.price);
					} else {
						return (b.price - a.price);
					}
				} else {
					// Default sort by title
					if (this.sort_dir == "asc") {
						return a.title.localeCompare(b.title);
					} else {
						return b.title.localeCompare(a.title);
					}
				}
			});

			return sorted;
		}
	},
	created() {
		this.products = this.$store.getters.getProducts;
		this.max_price = this.filter_max_price = this.$store.getters.getProductsMaxPrice;
	},
	mounted() {
		this.sortByTitle();
	}
}
</script>

<style scoped>
.search-image {
	width: 100%;
}

.price {
	display: inline-block;
	padding-right: 30px;
	cursor: pointer;
}

.price-sort {
	background-repeat: no-repeat;
	background-position: 100% 50%;
	font-weight: bold;
	text-decoration: underline;
	padding-right: 30px;
}
.price-asc {
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' fill='currentColor' class='bi bi-sort-numeric-down' viewBox='0 0 16 16'%3E%3Cpath d='M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z'/%3E%3Cpath fill-rule='evenodd' d='M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z'/%3E%3Cpath d='M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z'/%3E%3C/svg%3E");
}
.price-desc {
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' fill='currentColor' class='bi bi-sort-numeric-up' viewBox='0 0 16 16'%3E%3Cpath d='M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z'/%3E%3Cpath fill-rule='evenodd' d='M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z'/%3E%3Cpath d='M4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z'/%3E%3C/svg%3E");
}

.title {
	display: inline-block;
	padding-right: 30px;
	cursor: pointer;
}

.title-sort {
	background-repeat: no-repeat;
	background-position: 100% 50%;
	font-weight: bold;
	text-decoration: underline;
	padding-right: 30px;
}
.title-asc {
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' fill='currentColor' class='bi bi-sort-alpha-down' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M10.082 5.629L9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z'/%3E%3Cpath d='M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z'/%3E%3C/svg%3E");
}
.title-desc {
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='25' height='25' fill='currentColor' class='bi bi-sort-alpha-up' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M10.082 5.629L9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z'/%3E%3Cpath d='M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z'/%3E%3C/svg%3E");
}

</style>