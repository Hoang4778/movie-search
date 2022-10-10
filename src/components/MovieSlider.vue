<template>
	<div id="container" v-if="result">
		<h1>{{ sliderName }}:</h1>
		<div id="slider" ref="slider" v-if="result.items">
			<div
				v-for="item in result.items.slice(0, 20)"
				:key="item.id"
				class="item-box"
				:style="{ transform: movement }"
				ref="itemBox"
			>
				<img :src="item.image" alt="movie-image" v-if="item.image" />
				<router-link
					:to="{ name: 'info', params: { type: item.id } }"
					id="title"
					>{{ item.fullTitle ? item.fullTitle : item.title }}
				</router-link>
				<p>
					<i class="fa-solid fa-star"></i>
					{{ item.imDbRating ? item.imDbRating : "0" }}
				</p>
			</div>
			<button id="left-arrow" @click="prev">
				<i class="fa-solid fa-angle-left"></i>
			</button>
			<button id="right-arrow" @click="next">
				<i class="fa-solid fa-angle-right"></i>
			</button>
		</div>
		<h3 v-else>{{ result.errorMessage }}</h3>
	</div>
	<LoadingScreen v-else />
</template>

<script>
import { ref } from "@vue/reactivity";
import LoadingScreen from "../components/LoadingScreen.vue";
import { watch, watchEffect } from "@vue/runtime-core";
export default {
	components: { LoadingScreen },
	props: ["sliderName", "data"],
	setup(props) {
		let result = ref(null);
		watchEffect(() => {
			result.value = props.data;
		});

		const slider = ref(null);
		const itemBox = ref(null);
		let movement = ref("");

		let gap = 2;
		let style = "";
		let fontSize = "";
		let itemGap = 0;
		let step = 0;
		let contentWidth = 0;
		let trace = 0;
		let exactStep = 0;
		let stepNum = 0;
		let counter = 0;

		watch(itemBox, () => {
			style = window.getComputedStyle(slider.value);
			fontSize = parseInt(style.fontSize.replace("px", ""));
			itemGap = gap * fontSize;
			step =
				Math.floor(slider.value.clientWidth / itemBox.value[0].clientWidth) *
					itemBox.value[0].offsetWidth +
				(Math.floor(slider.value.clientWidth / itemBox.value[0].clientWidth) -
					1) *
					itemGap;
			itemBox.value.forEach((element) => (contentWidth += element.offsetWidth));
			contentWidth = contentWidth + itemGap * (itemBox.value.length - 1);
			trace = contentWidth - slider.value.clientWidth;
			exactStep = parseFloat((trace / step).toFixed(2));
			stepNum = Math.ceil(trace / step);
		});

		window.addEventListener("resize", function () {
			trace = contentWidth - slider.value.clientWidth;
			step =
				Math.floor(slider.value.clientWidth / itemBox.value[0].clientWidth) *
					itemBox.value[0].offsetWidth +
				(Math.floor(slider.value.clientWidth / itemBox.value[0].clientWidth) -
					1) *
					itemGap;
			exactStep = parseFloat((trace / step).toFixed(2));
			stepNum = Math.ceil(trace / step);
		});

		function next() {
			if (exactStep % 1 == 0) {
				if (counter == stepNum) {
					counter = 0;
				} else {
					counter++;
				}
				movement.value = `translateX(-${counter * step}px)`;
			} else {
				if (counter == stepNum) {
					counter = 0;
					movement.value = `translateX(-${counter * step}px)`;
				} else if (counter == stepNum - 1) {
					counter = stepNum;
					movement.value = `translateX(-${exactStep * step}px)`;
				} else if (counter > stepNum) {
					counter = 0;
					movement.value = `translateX(-${counter * step}px)`;
				} else {
					counter++;
					movement.value = `translateX(-${counter * step}px)`;
				}
			}
		}

		function prev() {
			if (exactStep % 1 == 0) {
				if (counter == 0) {
					counter = stepNum;
				} else {
					counter--;
				}
				movement.value = `translateX(-${counter * step}px)`;
			} else {
				if (counter == 0) {
					counter = stepNum;
					movement.value = `translateX(-${exactStep * step}px)`;
				} else {
					counter--;
					movement.value = `translateX(-${counter * step}px)`;
				}
			}
		}

		return { prev, next, movement, slider, itemBox, result };
	},
};
</script>

<style scoped>
#container {
	margin: 2rem 0;
	max-width: 68rem;
	width: 100%;
}
#container h1 {
	margin-bottom: 1rem;
	border-left: 10px solid orange;
	padding-left: 1rem;
}
#slider {
	position: relative;
	width: 100%;
	display: grid;
	grid-auto-flow: column;
	justify-items: stretch;
	overflow-x: hidden;
	gap: 2rem;
	padding: 0.5rem 0;
}

.item-box {
	width: 12rem;
	height: 20rem;
	border: 1px solid black;
	border-radius: 0.5rem;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	line-height: 1.2rem;
	padding-bottom: 1rem;
	background-color: white;
	transition: all 0.5s ease;
}
.item-box > img {
	width: 100%;
	height: 75%;
	border-radius: 0.5rem 0.5rem 0 0;
}
#title {
	padding: 0 0.5rem;
	text-decoration: none;
	color: black;
}
#title:hover {
	color: hsl(39, 100%, 50%);
	cursor: pointer;
}
#left-arrow {
	position: absolute;
	background-color: hsla(0, 0%, 100%, 0.5);
	color: orange;
	border: none;
	cursor: pointer;
	font-size: 3rem;
	top: 40%;
}
#right-arrow {
	position: absolute;
	background-color: hsla(0, 0%, 100%, 0.5);
	color: orange;
	border: none;
	cursor: pointer;
	font-size: 3rem;
	top: 40%;
	right: 0;
}
.fa-star {
	color: orange;
}
h3 {
	margin: 7rem;
	text-align: center;
}
</style>
