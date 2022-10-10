<template>
	<h1>Search results for "{{ keyword }}":</h1>
	<SearchResult :keyword="keyword" />
</template>

<script>
import SearchResult from "../components/SearchResult.vue";
export default {
	components: { SearchResult },
	props: ["keyword"],
};
</script>

<style scoped>
h1 {
	text-align: center;
	margin: 2rem auto;
}
</style>
