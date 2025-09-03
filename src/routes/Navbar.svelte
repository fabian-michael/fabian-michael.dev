<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { Collapsible } from '$components/collapsible';
	import { Logo } from '$components/logo';
	import { ThemeSelect } from '$components/theme-select';
	import { userStore } from '$lib/client/stores/user-store.svelte';
	import { melt } from '@melt-ui/svelte';
	import PhSignOut from '~icons/ph/sign-out';
	import Navigation from './Navigation.svelte';

	let isMenuOpen = $state(false);
	let menuTrigger = $state<any>();

	afterNavigate(() => {
		isMenuOpen = false;
	});
</script>

<header class="fixed bottom-0 z-30 flex w-full flex-col-reverse py-4 sm:relative sm:flex-col">
	<div class="container">
		<div class="navbar rounded-box bg-base-100 shadow-lg sm:bg-transparent sm:shadow-none">
			<div class="navbar-start">
				<a href="/" class="block">
					<Logo class="h-6 w-auto sm:h-8" />
				</a>
			</div>

			<div class="navbar-center"></div>

			<div class="navbar-end">
				{#if userStore.user}
					<a
						href="/auth/logout?redirectTo={$page.url.pathname}"
						class="btn btn-square btn-ghost"
					>
						<PhSignOut class="h-6 w-6" />
					</a>
				{/if}

				<ThemeSelect />

				{#if typeof menuTrigger !== 'undefined'}
					<button
						class="btn grid! btn-square place-content-center! btn-ghost"
						title="Toggle menu"
						onclick={(event) => event.stopPropagation()}
						use:melt={$menuTrigger}
					>
						<span
							class="col-span-full row-span-full block h-0.5 w-6 bg-base-content transition-all"
							class:rotate-45={isMenuOpen}
							class:-translate-y-1.5={!isMenuOpen}
						></span>
						<span
							class="col-span-full row-span-full block h-0.5 w-6 bg-base-content transition-all"
							class:-rotate-45={isMenuOpen}
							class:translate-y-1.5={!isMenuOpen}
						></span>
					</button>
				{:else}
					<button
						class="btn grid! btn-square place-content-center! btn-ghost"
						title="Toggle menu"
						disabled
					>
						<span
							class="col-span-full row-span-full block h-0.5 w-6 bg-base-content transition-all"
							class:rotate-45={isMenuOpen}
							class:-translate-y-1.5={!isMenuOpen}
						></span>
						<span
							class="col-span-full row-span-full block h-0.5 w-6 bg-base-content transition-all"
							class:-rotate-45={isMenuOpen}
							class:translate-y-1.5={!isMenuOpen}
						></span>
					</button>
				{/if}
			</div>
		</div>
	</div>

	<Collapsible
		open={isMenuOpen}
		onOpenChange={({ next }) => (isMenuOpen = next)}
		triggerRef={(trigger) => (menuTrigger = trigger)}
	>
		<div class="container">
			<div class="navbar">
				<div class="navbar-start"></div>
				<div class="navbar-center"></div>
				<div class="navbar-end">
					<Navigation onClickOutside={() => (isMenuOpen = false)} />
				</div>
			</div>
		</div>
	</Collapsible>
</header>
