<template>
	<div v-if="keywordRes">
		<h1>Keyword "{{ keywordRes.keyword }}":</h1>
		<div v-if="keywordRes.items" id="items">
			<div v-for="item in keywordRes.items" :key="item.id" class="item">
				<img :src="item.image" alt="title-image" v-if="item.image" />
				<router-link
					:to="{ name: 'info', params: { type: item.id } }"
					id="title"
					>{{ item.title }}</router-link
				>
				<p id="year">({{ item.year }})</p>
				<p><i class="fa-solid fa-star"></i> {{ item.imDbRating }}</p>
			</div>
		</div>
		<div v-else id="error">{{ keywordRes.errorMessage }}</div>
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
		let keywordRes = ref(null);

		keywordRes.value = props.data;

		return {
			keywordRes,
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
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
	margin-bottom: 2rem;
}
.item {
	width: 70%;
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
