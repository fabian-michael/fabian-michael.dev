<script lang="ts">
	import { clickOutside } from '$lib/client/actions/clickOutside';
	import OouiLock from '~icons/ooui/lock';
	import NavigationItem from './NavigationItem.svelte';

	const { onClickOutside } = $props<{
		onClickOutside?: () => void;
	}>();
</script>

<nav
	aria-label="Main navigation"
	use:clickOutside={onClickOutside}
>
	<ul class="shadow-lg menu sm:menu-horizontal bg-base-100 sm:bg-transparent rounded-box sm:shadow-none">
		<li>
			<NavigationItem href="/">Home</NavigationItem>
		</li>
		<li>
			<NavigationItem href="/about">About me</NavigationItem>
		</li>
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
