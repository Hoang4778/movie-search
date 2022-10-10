<template>
	<div v-if="companyData">
		<h1>Company {{ companyData.name }}</h1>
		<div v-if="companyData.items" id="items">
			<div v-for="movie in companyData.items" :key="movie.id" class="item">
				<img :src="movie.image" alt="title-image" v-if="movie.image" />
				<router-link
					:to="{ name: 'info', params: { type: movie.id } }"
					id="title"
					>{{ movie.title }}</router-link
				>
				<p id="year">({{ movie.year }})</p>
				<p><i class="fa-solid fa-star"></i> {{ movie.imDbRating }}</p>
			</div>
		</div>
		<div v-else id="error">{{ companyData.errorMessage }}</div>
	</div>
	<LoadingScreen v-else />
</template>

<script>
import { ref } from "@vue/reactivity";
import LoadingScreen from "./LoadingScreen.vue";
export default {
	components: { LoadingScreen },
	props: ["data"],
	setup(props) {
		let companyData = ref(null);

		companyData.value = props.data;

		return {
			companyData,
		};
	},
};
</script>

<style scoped>
h1 {
	text-align: center;
	margin: 2rem auto;
}
#items {
	width: 80%;
	margin: 2rem auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
}
.item {
	width: 100%;
	height: 8rem;
	background-color: white;
	border-radius: 10px;
	padding: 0 1rem;
	display: flex;
	align-items: center;
	gap: 2rem;
}
.item > img {
	width: 5rem;
	height: 100%;
}
#title {
	text-decoration: none;
	color: black;
}
#title:hover {
	color: orange;
	cursor: pointer;
}
#year {
	color: gray;
}
#error {
	font-size: 2rem;
	text-align: center;
	padding: 10rem 40%;
}
</style>
