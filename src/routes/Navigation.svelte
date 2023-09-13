<script>
	import { IconLockSquareRoundedFilled } from '@tabler/icons-svelte';
	import NavigationItem from './NavigationItem.svelte';
</script>

<nav aria-label="Main navigation">
	<ul class="px-1 menu sm:menu-horizontal">
		<li><NavigationItem href="/">Home</NavigationItem></li>
		<li><NavigationItem href="/about">About me</NavigationItem></li>
		<li><NavigationItem href="/blog">Blog</NavigationItem></li>
		<li><NavigationItem href="/resume">Resume <IconLockSquareRoundedFilled size="1.5em" /></NavigationItem></li>
	</ul>
</nav>
