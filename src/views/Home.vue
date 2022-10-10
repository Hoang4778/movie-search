<template>
  <div id="home-content">
    <MovieSlider sliderName="Most popular movies" :data="popularMovies" />
    <MovieSlider sliderName="In theaters" :data="inTheaters" />
    <MovieSlider sliderName="Most popular TVs" :data="popularTVs" />
    <MovieSlider sliderName="Coming soon" :data="comingSoon" />
  </div>
</template>

<script>
import { ref, watchEffect } from "@vue/runtime-core";
import MovieSlider from "../components/MovieSlider.vue";

export default {
  components: { MovieSlider },
  setup() {
    let popularMovies = ref(null);
    let inTheaters = ref(null);
    let popularTVs = ref(null);
    let comingSoon = ref(null);

    watchEffect(() => {
      fetch("https://imdb-api.com/en/API/MostPopularMovies/k_by0t2sqc")
        .then((res) => res.json())
        .then((response) => (popularMovies.value = response))
        .catch((error) => console.log(error));

      fetch("https://imdb-api.com/en/API/InTheaters/k_by0t2sqc")
        .then((res) => res.json())
        .then((response) => (inTheaters.value = response))
        .catch((error) => console.log(error));

      fetch("https://imdb-api.com/en/API/MostPopularTVs/k_by0t2sqc")
        .then((res) => res.json())
        .then((response) => (popularTVs.value = response))
        .catch((error) => console.log(error));

      fetch("https://imdb-api.com/en/API/ComingSoon/k_by0t2sqc")
        .then((res) => res.json())
        .then((response) => (comingSoon.value = response))
        .catch((error) => console.log(error));
    });
    return {
      popularMovies,
      inTheaters,
      popularTVs,
      comingSoon,
    };
  },
};
</script>

<style scoped>
#home-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
