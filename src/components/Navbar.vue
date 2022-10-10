<template>
	<div id="navbar">
		<img src="../assets/movie-time-cinema.svg" alt="page-logo" id="page-logo" />
		<div id="menu">
			<router-link :to="{ name: 'home' }">Home</router-link>
			<router-link :to="{ name: 'top250movies' }">Top250Movies</router-link>
			<router-link :to="{ name: 'top250tvs' }">Top250TVs</router-link>
			<router-link :to="{ name: 'boxoffice' }">BoxOffice</router-link>
		</div>
		<form id="search-bar" @submit.prevent="handleSubmit">
			<i class="fa-solid fa-magnifying-glass"></i>
			<input
				type="text"
				id="search-field"
				placeholder="Search"
				@keyup="handleSearch"
				v-model="searchInput"
			/>
			<i
				class="fa-solid fa-xmark"
				id="clear-search"
				v-if="searchInput"
				@click="clearSearch"
			></i>
			<div id="search-result">
				<div v-if="searchResult">
					<div v-if="searchResult.results">
						<div class="item" v-for="res in searchResult.results" :key="res.id">
							<img
								:src="res.image"
								alt="search-image"
								id="search-img"
								v-if="res.image"
							/>
							<router-link
								:to="{ name: 'info', params: { type: res.id } }"
								@click="handleClick"
								>{{ res.title }}</router-link
							>
						</div>
					</div>
					<p v-else>{{ searchResult.errorMessage }}</p>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { watch } from "@vue/runtime-core";
export default {
	setup() {
		let searchInput = ref("");
		let searchResult = ref(null);
		let router = useRouter();

		watch(searchInput, () => {
			if (searchInput.value == "") {
				searchResult.value = null;
			}
		});

		function handleSearch(e) {
			if (e.keyCode != 13 && e.keyCode != 8) {
				searchInput.value = e.target.value;
				setTimeout(() => {
					fetch(
						`https://imdb-api.com/en/API/SearchAll/k_by0t2sqc/${searchInput.value}`
					)
						.then((res) => res.json())
						.then((data) => (searchResult.value = data))
						.catch((error) => console.log(error));
				}, 1000);
			}
		}
		function clearSearch() {
			searchInput.value = "";
			searchResult.value = null;
		}
		function handleSubmit() {
			router.push({ name: "search", params: { keyword: searchInput.value } });
			searchInput.value = "";
			searchResult.value = null;
		}
		function handleClick() {
			searchInput.value = "";
			searchResult.value = null;
		}

		return {
			searchInput,
			handleSearch,
			clearSearch,
			searchResult,
			handleSubmit,
			handleClick,
		};
	},
};
</script>

<style scoped>
#navbar {
	width: 100%;
	height: 8rem;
	background-color: hsl(0, 0%, 30%);
	display: flex;
	justify-content: space-around;
	align-items: center;
}
#page-logo {
	width: 10rem;
}
#menu {
	font-size: 1.3rem;
	display: flex;
	gap: 1rem;
}
#menu a {
	text-decoration: none;
	color: white;
	transition: all 0.5s ease;
}
#menu a:hover {
	color: orange;
}
#search-bar {
	font-size: 1.2rem;
	background-color: white;
	max-width: 25rem;
	width: 100%;
	height: 3rem;
	display: flex;
	align-items: center;
	padding: 0 1.5rem;
	border: 1px solid grey;
	border-radius: 1.5rem;
	gap: 1rem;
	position: relative;
}
#search-field {
	max-width: 19rem;
	width: 100%;
	border: none;
	outline: none;
	font-size: 1.5rem;
}
#clear-search {
	cursor: pointer;
}
#search-result {
	background-color: white;
	position: absolute;
	top: 3rem;
	left: 3rem;
	max-width: 19rem;
	width: 100%;
	z-index: 2;
}
.item {
	width: 100%;
	height: 5rem;
	display: flex;
	padding-left: 1rem;
	align-items: center;
	gap: 1rem;
}
.item:hover {
	background-color: hsl(0, 0%, 90%);
}
.item > a {
	text-decoration: none;
	color: black;
	font-size: 0.8rem;
}
.item > a:hover {
	color: orange;
	cursor: pointer;
}
#search-img {
	width: 5rem;
	height: 5rem;
	object-fit: contain;
}
#search-result > p {
	text-align: center;
	padding: 1rem;
	font-size: 0.8rem;
}
</style>
