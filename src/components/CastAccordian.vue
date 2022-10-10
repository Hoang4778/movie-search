<template>
	<h2>Cast in:</h2>
	<div id="container">
		<div class="category" v-for="category in sortedList" :key="category.role">
			<div class="role">
				<h3>{{ category.role }}</h3>
				<i class="fa-solid fa-angle-down" @click="toggleAccordian"></i>
			</div>
			<div class="cast-container">
				<div class="cast-item" v-for="cast in category.casts" :key="cast.id">
					<router-link :to="{ name: 'info', params: { type: cast.id } }"
						><i class="fa-solid fa-angle-right"></i>
						{{ cast.title }}</router-link
					>
					<p>{{ cast.year ? cast.year : "year: ?" }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, watchEffect } from "@vue/runtime-core";
export default {
	props: ["castList"],
	setup(props) {
		let sortedList = ref([]);

		function toggleAccordian(e) {
			e.path[2].lastChild.classList.toggle("unfold");
			e.target.classList.toggle("turn");
		}

		watchEffect(() => {
			let list = props.castList;
			let category = [];
			let categories = [];

			for (let i = 0; i < list.length; i++) {
				category.push(list[i].role);
			}
			for (let i = 0; i < category.length; i++) {
				if (category[i] != category[i + 1]) {
					categories.push(category[i]);
				}
			}
			for (let el of categories) {
				sortedList.value.push({
					role: el,
					casts: list.filter((item) => item.role == el),
				});
			}
		});
		return { sortedList, toggleAccordian };
	},
};
</script>

<style scoped>
h2 {
	border-left: 10px solid orange;
	padding-left: 1rem;
	margin-bottom: 2rem;
}
.category {
	position: relative;
}
.role {
	position: sticky;
	top: 0;
	padding: 1rem;
	background-color: orange;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.fa-angle-down {
	font-size: 1.5rem;
	transition: all 0.5s ease;
}
.fa-angle-down:hover {
	cursor: pointer;
}
.turn {
	transform: rotate(180deg);
	color: white;
}
.cast-container {
	width: 100%;
	background-color: white;
	padding: 1rem 2rem;
	z-index: -1;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	display: none;
}
.unfold {
	display: block;
}
.cast-item > a {
	text-decoration: none;
	color: black;
}
.cast-item > a:hover {
	color: orange;
}
.cast-item > p {
	font-size: 0.8rem;
	color: gray;
}
</style>
