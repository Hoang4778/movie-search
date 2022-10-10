<template>
	<div id="container">
		<div id="box" v-if="loadingStat">
			<div id="one"></div>
			<div id="two">
				<div id="two1"></div>
				<div id="two2"></div>
			</div>
			<div id="three"></div>
		</div>
		<h3 v-else>
			Could not show the results due to the excessive amount of requests per day
			or server problem. Please try again later! Thank you!
		</h3>
	</div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
	setup() {
		let loadingStat = ref(true);
		setTimeout(() => {
			loadingStat.value = false;
		}, 20000);
		return {
			loadingStat,
		};
	},
};
</script>

<style scoped>
#container {
	width: 100%;
	height: 16rem;
}
#box {
	width: 6rem;
	margin: 7rem auto;
	position: relative;
}
#one {
	width: 1rem;
	height: 1rem;
	background-color: orange;
	border-radius: 5px;
	position: absolute;
	left: 2.5rem;
	transform-origin: top;
	animation: downloading1 2.2s infinite;
}

#two {
	display: flex;
}
#two1,
#two2 {
	width: 3rem;
	height: 1rem;
	background-color: orange;
	position: absolute;
	top: 0;
}
#two1 {
	border-radius: 5px 0 5px 5px;
	transform-origin: bottom left;
	animation: downloading2 2.2s infinite;
}

#two2 {
	right: 0;
	border-radius: 0 5px 5px 5px;
	transform-origin: bottom right;
	animation: downloading3 2.2s infinite;
}

#three {
	width: 6rem;
	height: 1rem;
	border-radius: 5px;
	background-color: orange;
	animation: downloading4 2.2s infinite;
}

@keyframes downloading1 {
	0% {
		transform: scaleY(1);
	}
	50% {
		transform: scaleY(3.5);
	}
	100% {
		transform: scaleY(1);
	}
}
@keyframes downloading2 {
	0% {
		transform: rotate(0deg);
	}
	50% {
		transform: rotate(45deg) scaleX(1.4);
	}
	100% {
		transform: rotate(0deg) scaleX(1);
	}
}
@keyframes downloading3 {
	0% {
		transform: rotate(0deg);
	}
	50% {
		transform: rotate(-45deg) scaleX(1.4);
	}
	100% {
		transform: rotate(0) scaleX(1);
	}
}
@keyframes downloading4 {
	0% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(4rem);
	}
	100% {
		transform: translateY(0);
	}
}
h3 {
	margin: 7rem 15rem;
	text-align: center;
}
</style>
