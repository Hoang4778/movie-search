import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Top250Movies from "../views/Top250Movies.vue";
import Top250TVs from "../views/Top250TVs.vue";
import BoxOffice from "../views/BoxOffice.vue";
import SearchPage from "../views/SearchPage.vue";
import InfoPage from "../views/InfoPage.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
	},
	{
		path: "/top250movies",
		name: "top250movies",
		component: Top250Movies,
	},
	{
		path: "/top250tvs",
		name: "top250tvs",
		component: Top250TVs,
	},
	{
		path: "/boxoffice",
		name: "boxoffice",
		component: BoxOffice,
	},
	{
		path: "/search/:keyword",
		name: "search",
		component: SearchPage,
		props: true,
	},
	{
		path: "/info/:type",
		name: "info",
		component: InfoPage,
		props: true,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
