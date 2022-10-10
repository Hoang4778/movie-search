<template>
	<div id="footer">
		<img src="../assets/movie-time-cinema.svg" alt="page-logo" id="page-logo" />
		<div id="contact">
			<ul id="social-links">
				<li><i class="fa-brands fa-facebook"></i></li>
				<li><i class="fa-brands fa-twitter"></i></li>
				<li><i class="fa-brands fa-youtube"></i></li>
				<li><i class="fa-brands fa-instagram"></i></li>
			</ul>
			<p>Copyright 2022. All rights reserved</p>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style scoped>
#footer {
	width: 100%;
	height: 8rem;
	background-color: hsl(0, 0%, 30%);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 2rem;
	color: white;
}
#page-logo {
	width: 10rem;
}
#social-links {
	display: flex;
	justify-content: space-around;
	align-items: center;
	font-size: 1.5rem;
}
#social-links li {
	list-style: none;
	cursor: pointer;
	transition: all 0.5s ease;
}
#social-links li:hover {
	color: orange;
}
</style>
