<template>
  <div
    v-if="titleData || companyData || nameData || keywordData"
    id="container"
  >
    <MovieInfo :data="titleData" v-if="titleData" />
    <CompanyInfo :data="companyData" v-else-if="companyData" />
    <NameInfo :data="nameData" v-else-if="nameData" />
    <KeywordInfo :data="keywordData" v-else />
  </div>
  <LoadingScreen v-else />
</template>

<script>
import { ref } from "@vue/reactivity";
import MovieInfo from "../components/MovieInfo.vue";
import CompanyInfo from "../components/CompanyInfo.vue";
import NameInfo from "../components/NameInfo.vue";
import KeywordInfo from "../components/KeywordInfo.vue";
import LoadingScreen from "../components/LoadingScreen.vue";
import { watchEffect } from "@vue/runtime-core";
export default {
  components: { MovieInfo, CompanyInfo, NameInfo, KeywordInfo, LoadingScreen },
  props: ["type"],
  setup(props) {
    let titleData = ref(null);
    let nameData = ref(null);
    let companyData = ref(null);
    let keywordData = ref(null);

    watchEffect(() => {
      window.scrollTo(0, 0);
      titleData.value = null;
      nameData.value = null;
      companyData.value = null;
      keywordData.value = null;
      switch (props.type.slice(0, 2)) {
        case "nm":
          fetch(`https://imdb-api.com/en/API/Name/k_by0t2sqc/${props.type}`)
            .then((res) => res.json())
            .then((data) => (nameData.value = data))
            .catch((error) => console.log(error));
          break;
        case "tt":
          fetch(`https://imdb-api.com/en/API/Title/k_by0t2sqc/${props.type}`)
            .then((res) => res.json())
            .then((data) => (titleData.value = data))
            .catch((error) => console.log(error));
          break;
        case "co":
          fetch(`https://imdb-api.com/en/API/Company/k_by0t2sqc/${props.type}`)
            .then((res) => res.json())
            .then((data) => (companyData.value = data))
            .catch((error) => console.log(error));
          break;
        default:
          fetch(`https://imdb-api.com/API/Keyword/k_by0t2sqc/${props.type}`)
            .then((res) => res.json())
            .then((data) => (keywordData.value = data))
            .catch((error) => console.log(error));
          break;
      }
    });

    return {
      titleData,
      nameData,
      keywordData,
      companyData,
    };
  },
};
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
