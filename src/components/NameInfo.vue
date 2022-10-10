<template>
	<div v-if="actorData" id="container">
		<div v-if="!actorData.errorMessage">
			<div id="top-sect">
				<img :src="actorData.image" alt="actor-image" />
				<div id="actor-title">
					<h1>{{ actorData.name }}</h1>
					<p class="actor-role">{{ actorData.role }}</p>
					<p>
						<strong>Birthdate</strong>: {{ monthOfBirth }} {{ dateOfBirth }}
						{{ yearOfBirth }}
					</p>
					<p>
						<strong>Deathdate</strong>:
						{{ actorData.deathDate ? actorData.deathDate : "N/A" }}
					</p>
					<p><strong>Awards</strong>: {{ actorData.awards }}</p>
					<p><strong>Brief bio:</strong> {{ actorData.summary }}</p>
					<p><strong>Height</strong>: {{ actorData.height }}</p>
				</div>
			</div>
			<div id="mid-sect">
				<h2>Known for:</h2>
				<div id="known-for">
					<div class="famous" v-for="item in actorData.knownFor" :key="item.id">
						<img :src="item.image" alt="famous-image" />
						<router-link :to="{ name: 'info', params: { type: item.id } }">{{
							item.fullTitle
						}}</router-link>
						<p class="actor-role">{{ item.role }}</p>
					</div>
				</div>
			</div>
			<div id="bot-sect">
				<CastAccordian :castList="actorData.castMovies" />
			</div>
		</div>
		<div v-else id="error">{{ actorData.errorMessage }}</div>
	</div>
	<LoadingScreen v-else />
</template>

<script>
import { ref } from "@vue/reactivity";
import LoadingScreen from "./LoadingScreen.vue";
import CastAccordian from "./CastAccordian.vue";
export default {
	components: { LoadingScreen, CastAccordian },
	props: ["data"],
	setup(props) {
		let actorData = ref(null);
		let yearOfBirth = ref("");
		let monthOfBirth = ref("");
		let dateOfBirth = ref("");
		let months = {
			"01": "Jan",
			"02": "Feb",
			"03": "Mar",
			"04": "Apr",
			"05": "May",
			"06": "Jun",
			"07": "Jul",
			"08": "Aug",
			"09": "Sep",
			10: "Oct",
			11: "Nov",
			12: "Dec",
		};

		actorData.value = props.data;

		if (actorData.value.birthDate) {
			yearOfBirth.value = actorData.value.birthDate.slice(0, 4);
			let month = actorData.value.birthDate.slice(5, 7);
			for (let i in months) {
				if (i == month) {
					monthOfBirth.value = months[i];
				}
			}
			dateOfBirth.value = actorData.value.birthDate.slice(8, 10);
		}

		return {
			actorData,
			yearOfBirth,
			monthOfBirth,
			dateOfBirth,
		};
	},
};
</script>

<style scoped>
#container {
	width: 80%;
	margin: 2rem auto;
}
#top-sect {
	display: flex;
	gap: 2rem;
	margin-bottom: 2rem;
}
#top-sect > img {
	width: 30%;
	height: auto;
}
#actor-title {
	line-height: 2rem;
}
.actor-role {
	color: gray;
}
#actor-title > p > strong {
	text-decoration: underline;
}
#mid-sect {
	margin-bottom: 2rem;
}
#mid-sect > h2 {
	border-left: 10px solid orange;
	padding-left: 1rem;
	margin-bottom: 2rem;
}
#known-for {
	display: flex;
	gap: 2rem;
}
.famous {
	width: 40%;
}
.famous > img {
	width: 100%;
	height: 80%;
}
.famous > a {
	text-decoration: none;
	color: black;
}
.famous > a:hover {
	color: orange;
}
</style>
