<template>
	<Navbar />
	<div id="view">
		<router-view></router-view>
	</div>
	<Footer />
</template>

<script>
import Navbar from "../src/components/Navbar.vue";
import Footer from "../src/components/Footer.vue";
export default {
	components: { Navbar, Footer },
};
</script>

<style>
#view {
	width: 100%;
	min-height: 1080px;
}
</style>
