<template>
	<ListPage
		listName="Top 250 movies of all time"
		fetchAPI="https://imdb-api.com/en/API/Top250Movies/k_by0t2sqc"
	/>
</template>

<script>
import ListPage from "../components/ListPage.vue";
export default {
	components: { ListPage },
};
</script>

<style></style>
