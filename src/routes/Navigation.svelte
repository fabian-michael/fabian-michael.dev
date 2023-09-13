<script>
	import NavigationItem from './NavigationItem.svelte';
</script>

<nav aria-label="Main navigation">
	<ul class="px-1 menu sm:menu-horizontal">
		<li><NavigationItem href="/">Home</NavigationItem></li>
		<li><NavigationItem href="/about">About me</NavigationItem></li>
		<li><NavigationItem href="/blog">Blog</NavigationItem></li>
		<li><NavigationItem href="/resume">Resume</NavigationItem></li>
	</ul>
</nav>
