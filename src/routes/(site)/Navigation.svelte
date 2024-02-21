<script>
	import OouiLock from '~icons/ooui/lock';
	import NavigationItem from './NavigationItem.svelte';
</script>

<nav aria-label="Main navigation">
	<ul class="px-1 menu sm:menu-horizontal">
		<li><NavigationItem href="/">Home</NavigationItem></li>
		<li><NavigationItem href="/about">About me</NavigationItem></li>
		<li>
			<NavigationItem
				href="/resume"
				preload={false}
			>
				<OouiLock /> Resume (tbd)
			</NavigationItem>
		</li>
	</ul>
</nav>
