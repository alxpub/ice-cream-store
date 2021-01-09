<template>
	<div class="col col-sm-8 col-md-6 mb-3 mx-auto">
		<div class="input-group">
			<div class="form-control" style="font-size:1.2em;">
				<vue-autosuggest
					:suggestions="filteredProducts"
					:input-props="{id:'autosuggest__input', placeholder:'Want some ice cream?'}"
					:get-suggestion-value="getSuggestionValue"
					@input="onInputChange"
					@selected="selectHandler"
					v-model="searchText"
					@keyup.enter="performSearch"
				>  
					<template slot-scope="{suggestion}">
						<img :src="publicPath + suggestion.item.thumb" />
						<div>{{suggestion.item.title}}</div>
					</template>
				</vue-autosuggest>
			</div>
			<button @click="performSearch" class="btn btn-outline-success" type="button">Search</button>
		</div>
	</div>
</template>

<script>
import { VueAutosuggest } from 'vue-autosuggest';

export default {
	name: 'SearchBox',
	data() {
		return {
			publicPath: process.env.BASE_URL,
			searchText: "",
			clicked_item: null
		}
	},
	methods: {
		performSearch() {
			this.$emit('perform-search', this.searchText);
		},

		selectHandler(item) {
			this.searchText = item.item.title;
			this.clicked_item = item.item;
		},
		
		onInputChange() {
			this.clicked_item = null;
		},

		getSuggestionValue(suggestion) {
			return suggestion.item.title;
		}
	},
	computed: {
		filteredProducts() {
			return [{
				data: this.$store.state.products.filter(product => {
					return product.title.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
				})
			}];
		}
	},
	components: {
		VueAutosuggest
	}
}
</script>

<style>
#autosuggest input {
	width: 100%;
	border-style: none;
	outline-style: none;
}

.autosuggest__results-container {
	position: relative;
}

.autosuggest__results {
	position: absolute;
	border: 1px solid #eee;
	border-radius: 0 0 5px 5px;
	background: #fff;
	width: 300px;
	z-index: 999;
	margin: 8px 0 0 -12px;
}
.autosuggest__results > ul {
	list-style: none;
	padding: 0;
	margin: 0;
}
.autosuggest__results-item {
	font-size: 1.1rem;
	padding: 5px 10px;
	cursor: pointer;
	display: flex;
}
.autosuggest__results-item > img {
	display: block;
	width: 35px;
	height: 35px;
	border-radius: 3px;
	margin-right: 10px;
}

.autosuggest__results-item--highlighted {
	color: #00d;
	background: #eee;
}
</style>