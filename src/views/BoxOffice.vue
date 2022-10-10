<template>
	<ListPage
		listName="Top movies at box office lately"
		fetchAPI="https://imdb-api.com/en/API/BoxOffice/k_by0t2sqc"
	/>
</template>

<script>
import ListPage from "../components/ListPage.vue";
export default {
	components: { ListPage },
};
</script>

<style></style>
