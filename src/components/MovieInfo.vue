<template>
	<div v-if="info">
		<div v-if="!info.errorMessage">
			<div id="top-sect">
				<img
					:src="info.image"
					alt="movie-image"
					id="movie-img"
					v-if="info.image"
				/>
				<div>
					<div id="title-info">
						<p id="title">{{ info.title }}</p>
						<p>({{ info.year }})</p>
					</div>
					<p id="runtime">{{ info.runtimeStr }}</p>
					<div id="rating">
						<p><i class="fa-solid fa-star"></i> {{ info.imDbRating }}</p>
						<p>({{ info.imDbRatingVotes }})</p>
					</div>
					<p class="top-info"><strong>Genres:</strong> {{ info.genres }}</p>
					<p class="top-info"><strong>Stars:</strong> {{ info.stars }}</p>
					<p class="top-info"><strong>Storyline:</strong> {{ info.plot }}</p>
					<p class="top-info">
						<strong>Directors:</strong> {{ info.directors }}
					</p>
					<p class="top-info"><strong>Writers:</strong> {{ info.writers }}</p>
					<p class="top-info">
						<strong>Languages:</strong> {{ info.languages }}
					</p>
					<p class="top-info">
						<strong>Countries:</strong> {{ info.countries }}
					</p>
				</div>
			</div>
			<div id="mid-sect">
				<div id="top-casts">
					<h2>Top casts:</h2>
					<div id="casts-list">
						<div class="actor" v-for="actor in info.actorList" :key="actor.id">
							<img :src="actor.image" alt="actor-image" class="actor-image" />
							<div class="actor-name">
								<router-link
									:to="{ name: 'info', params: { type: actor.id } }"
									>{{ actor.name }}</router-link
								>
								<p>as {{ actor.asCharacter }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="bot-sect">
				<MovieSlider sliderName="More like this" :data="moreMovies" />
			</div>
		</div>
		<div v-else id="error">{{ info.errorMessage }}</div>
	</div>
	<LoadingScreen v-else />
</template>

<script>
import { ref } from "@vue/reactivity";
import MovieSlider from "./MovieSlider.vue";
import LoadingScreen from "./LoadingScreen.vue";
export default {
	components: { MovieSlider, LoadingScreen },
	props: ["data"],
	setup(props) {
		let info = ref(null);
		let moreMovies = ref({});

		info.value = props.data;
		moreMovies.value = {
			items: info.value.similars,
			error: info.value.errorMessage,
		};

		return {
			info,
			moreMovies,
		};
	},
};
</script>

<style scoped>
.top-info > strong {
	text-decoration: underline;
}
.top-info {
	max-width: 70ch;
	width: 100%;
}
#top-sect {
	margin: 2rem 4rem;
	display: flex;
	align-items: flex-start;
	gap: 2rem;
}
#movie-img {
	width: 25%;
	height: 100%;
}
#title-info {
	width: 70%;
	display: flex;
	gap: 1rem;
	align-items: center;
}
#title {
	font-size: 2rem;
	font-weight: 700;
}
#runtime {
	color: gray;
	margin-bottom: 2rem;
}
#rating {
	display: flex;
	gap: 1rem;
	align-items: center;
	font-size: 1.5rem;
	margin-bottom: 2rem;
}
.fa-star {
	color: orange;
}
.top-info {
	margin-bottom: 0.5rem;
}
#mid-sect {
	margin: 2rem 4rem;
}
#top-casts {
	margin-top: 2rem;
}
#casts-list {
	margin: 2rem 0;
	width: 80%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 2rem;
}
.actor {
	height: 5rem;
	display: flex;
	align-items: center;
	gap: 2rem;
}
.actor-image {
	width: 5rem;
	height: 5rem;
	border-radius: 50%;
	object-fit: cover;
}
.actor-name > a {
	text-decoration: none;
	color: black;
}
.actor-name > a:hover {
	color: orange;
}
.actor-name > p {
	color: gray;
}
#bot-sect {
	margin: 2rem 4rem;
}
#error {
	font-size: 2rem;
	text-align: center;
	padding: 10rem 40%;
}
</style>
