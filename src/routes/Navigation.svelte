<script lang="ts">
	import { page } from '$app/stores';
	import { clickOutside } from '$lib/client/actions/clickOutside';
	import PhLock from '~icons/ph/lock';
	import PhLockOpen from '~icons/ph/lock-open';
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
				<svelte:component this={$page.data.user ? PhLockOpen : PhLock} /> Resume (tbd)
			</NavigationItem>
		</li>
	</ul>
</nav>
