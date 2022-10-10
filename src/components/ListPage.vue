<template>
	<div id="container" v-if="data">
		<h1>{{ listName }}</h1>
		<div v-if="data.items" id="collection">
			<div v-for="item in data.items" :key="item.id" class="item-content">
				<p id="rank">#{{ item.rank }}</p>
				<img :src="item.image" alt="movie-image" v-if="item.image" />
				<router-link
					:to="{ name: 'info', params: { type: item.id } }"
					id="title"
					>{{ item.fullTitle ? item.fullTitle : item.title }}</router-link
				>
				<p v-if="!item.fullTitle">{{ item.year }}</p>
				<p v-if="item.imDbRating">
					<i class="fa-solid fa-star"></i> {{ item.imDbRating }}
				</p>
			</div>
		</div>
		<h3 v-else>{{ data.errorMessage }}</h3>
	</div>
	<LoadingScreen v-else />
</template>

<script>
import { ref } from "@vue/reactivity";
import LoadingScreen from "../components/LoadingScreen.vue";
import { onMounted } from "@vue/runtime-core";
export default {
	components: { LoadingScreen },
	props: ["listName", "fetchAPI"],
	setup(props) {
		let data = ref(null);
		onMounted(() => {
			fetch(props.fetchAPI)
				.then((res) => res.json())
				.then((result) => (data.value = result))
				.catch((error) => console.log(error));
		});
		return {
			data,
		};
	},
};
</script>

<style scoped>
#container {
	width: 100%;
	padding-top: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	gap: 2rem;
}
#collection {
	width: 90%;
}
#title {
	text-decoration: none;
	color: black;
}
#title:hover {
	color: orange;
	cursor: pointer;
}
.item-content {
	width: 100%;
	height: 8rem;
	border-radius: 10px;
	display: flex;
	align-items: center;
	gap: 1rem;
	padding-left: 1rem;
	background-color: white;
	margin-bottom: 1rem;
	font-size: 1.2rem;
}
#rank {
	width: 5rem;
	justify-self: flex-start;
}
.item-content > img {
	width: 7rem;
	height: 100%;
	object-fit: contain;
}
.fa-star {
	color: orange;
}
h3 {
	margin: 7rem;
	text-align: center;
}
</style>
