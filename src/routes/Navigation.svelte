<script lang="ts">
	import { clickOutside } from '$lib/client/actions/clickOutside';
	import { userStore } from '$lib/client/stores/user-store.svelte';
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
			<NavigationItem
				href="/resume"
				preload={false}
			>
				<svelte:component this={userStore.user ? PhLockOpen : PhLock} /> Resume (work in progress)
			</NavigationItem>
		</li>
	</ul>
</nav>
