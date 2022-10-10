<template>
	<div id="results" v-if="data">
		<div v-if="data.results">
			<div v-for="item in data.results" :key="item.id" class="item-content">
				<img :src="item.image" alt="movie-image" v-if="item.image" />
				<router-link
					:to="{ name: 'info', params: { type: item.id } }"
					id="title"
					>{{ item.title }}</router-link
				>
				<p id="type">({{ item.resultType }})</p>
				<p>{{ item.description }}</p>
			</div>
		</div>
		<h3 v-else>{{ data.errorMessage }}</h3>
	</div>
	<LoadingScreen v-else />
</template>

<script>
import { ref, watchEffect } from "@vue/runtime-core";
import LoadingScreen from "../components/LoadingScreen.vue";
export default {
	components: { LoadingScreen },
	props: ["keyword"],
	setup(props) {
		let data = ref(null);
		watchEffect(() => {
			fetch(`https://imdb-api.com/en/API/SearchAll/k_by0t2sqc/${props.keyword}`)
				.then((res) => res.json())
				.then((results) => (data.value = results))
				.catch((error) => console.log(error));
		});
		return {
			data,
		};
	},
};
</script>

<style scoped>
#results {
	width: 90%;
	margin: 2rem auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	gap: 2rem;
}
.item-content {
	width: 100%;
	height: 8rem;
	border-radius: 10px;
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 0 1rem;
	background-color: white;
	margin-bottom: 1rem;
	font-size: 1.2rem;
}
#title {
	text-decoration: none;
	color: black;
}
#title:hover {
	color: orange;
	cursor: pointer;
}
#type {
	color: gray;
}
.item-content > img {
	width: 7rem;
	height: 100%;
}
h3 {
	margin: 10rem auto;
	text-align: center;
}
</style>
