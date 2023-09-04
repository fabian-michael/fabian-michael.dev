<script>
	import LL from '$i18n/i18n-svelte';
	import NavigationItem from './NavigationItem.svelte';
</script>

<nav aria-label="{$LL.navigation.label()}">
	<ul class="px-1 menu sm:menu-horizontal">
		<li><NavigationItem href="/">{$LL.navigation.home().toUpperCase()}</NavigationItem></li>
		<li><NavigationItem href="/about">{$LL.navigation.about().toUpperCase()}</NavigationItem></li>
		<li><NavigationItem href="/blog">{$LL.navigation.blog().toUpperCase()}</NavigationItem></li>
	</ul>
</nav>
