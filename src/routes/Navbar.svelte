<script lang="ts">
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { Collapsible } from '$components/collapsible';
	import { Logo } from '$components/logo';
	import { ThemeSelect } from '$components/theme-select';
	import { melt } from '@melt-ui/svelte';
	import Navigation from './Navigation.svelte';

	export let isMenuOpen = false;
	let menuTrigger: any;

	afterNavigate(() => {
		isMenuOpen = false;
	});
</script>

<header class="fixed bottom-0 z-30 flex flex-col-reverse w-full py-4 sm:relative sm:flex-col">
	<div class="container">
		<div class="shadow-lg navbar bg-base-100 rounded-box sm:bg-transparent sm:shadow-none">
			<div class="navbar-start">
				<a
					href="/"
					class="block"
				>
					<Logo class="w-auto h-6 sm:h-8" />
				</a>
			</div>

			<div class="navbar-center"></div>

			<div class="navbar-end">
				{#if browser && $page.data.session}
					<a
						href="/auth/logout?redirectTo={$page.url.pathname}"
						class="btn btn-square btn-ghost"
					>
						<!-- <IconLogout /> -->
					</a>
				{/if}

				<ThemeSelect />

				{#if typeof menuTrigger !== 'undefined'}
					<button
						class="btn btn-square btn-ghost !grid !place-content-center"
						title="Toggle menu"
						onclick={(event) => event.stopPropagation()}
						use:melt={$menuTrigger}
					>
						<span
							class="block w-6 h-0.5 bg-base-content row-span-full col-span-full transition-all"
							class:rotate-45={isMenuOpen}
							class:-translate-y-1.5={!isMenuOpen}
						></span>
						<span
							class="block w-6 h-0.5 bg-base-content row-span-full col-span-full transition-all"
							class:-rotate-45={isMenuOpen}
							class:translate-y-1.5={!isMenuOpen}
						></span>
					</button>
				{:else}
					<button
						class="btn btn-square btn-ghost !grid !place-content-center"
						title="Toggle menu"
						disabled
					>
						<span
							class="block w-6 h-0.5 bg-base-content row-span-full col-span-full transition-all"
							class:rotate-45={isMenuOpen}
							class:-translate-y-1.5={!isMenuOpen}
						></span>
						<span
							class="block w-6 h-0.5 bg-base-content row-span-full col-span-full transition-all"
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
