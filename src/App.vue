<template>
  <div id="app">
	<router-link to="/" class="icon icon-home" aria-current="page">&nbsp;</router-link> 
	<router-link to="/cart" class="icon icon-cart" aria-current="page">{{ getCartCount }}</router-link> 
	<div class="container mt-5 pt-2 mb-5">
		<div>
			<h1>Ice Cream Shop</h1>
		</div>
		<router-view />
	</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters(['getCartCount'])
	}
}
</script>

<style scoped>
.icon {
	position: fixed;
	display: block;
	text-decoration: none;
	width: 50px;
	height: 50px;
	left: 10px;
	top: 0;
	padding: 10px;
	border: 1px solid #777;
	border-top-style: none;
	border-radius: 0 0 10px 10px;
	opacity: 0.8;
	background-color: #eee;
	background-position: 50% 50%;
	background-repeat: no-repeat;
	z-index: 9999;
}

.icon-home {
	left: 10px;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='currentColor' class='bi bi-house' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z'/%3E%3Cpath fill-rule='evenodd' d='M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z'/%3E%3C/svg%3E");
}

.icon-cart {
	left: 70px;
	text-align: center;
	font-weight: bold;
	color: #000;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='currentColor' class='bi bi-cart' viewBox='0 0 16 16'%3E%3Cpath d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z'/%3E%3C/svg%3E");
}

</style>
