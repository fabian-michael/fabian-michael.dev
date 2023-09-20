<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { Collapsible } from '$components/collapsible';
	import { Logo } from '$components/logo';
	import { ThemeSelect } from '$components/theme-select';
	import { melt } from '@melt-ui/svelte';
	import type { CollapsibleEvents } from '@melt-ui/svelte/dist/builders/collapsible/events';
	import type { ExplicitBuilderReturn } from '@melt-ui/svelte/internal/helpers';
	import type { MeltActionReturn } from '@melt-ui/svelte/internal/types';
	import { IconLogout } from '@tabler/icons-svelte';
	import type { Invalidator, Subscriber, Unsubscriber, Updater, Writable } from 'svelte/store';
	import Navigation from './Navigation.svelte';

	export let isMenuOpen = false;
	let menuTrigger: ExplicitBuilderReturn<
		[
			{
				update: (updater: Updater<boolean>, sideEffect?: ((newValue: boolean) => void) | undefined) => void;
				set: (this: void, value: boolean) => void;
				subscribe(
					this: void,
					run: Subscriber<boolean>,
					invalidate?: Invalidator<boolean> | undefined,
				): Unsubscriber;
			},
			Writable<boolean>,
		],
		(node: HTMLElement) => MeltActionReturn<CollapsibleEvents['trigger']>,
		([$open, $disabled]: [boolean, boolean]) => {
			readonly 'data-state': 'open' | 'closed';
			readonly 'data-disabled': '' | undefined;
			readonly disabled: boolean;
		},
		string
	>;
</script>

<header>
	<div>
		<div class="container">
			<div class="flex items-center py-6">
				<div class="flex-1">
					<a
						href="/"
						class="block w-fit"
					>
						<Logo />
					</a>
				</div>

				<div class="flex items-center gap-1 sm:gap-4">
					{#if browser && $page.data.session}
						<a
							href="/auth/logout?redirectTo={$page.url.pathname}"
							class="btn btn-square btn-ghost"
						>
							<IconLogout />
						</a>
					{/if}

					<ThemeSelect />

					{#if typeof menuTrigger !== 'undefined'}
						<button
							class="btn btn-square btn-ghost !grid !place-content-center"
							title="Toggle menu"
							use:melt="{$menuTrigger}"
						>
							<span
								class="block w-6 h-0.5 bg-base-content row-span-full col-span-full transition-all"
								class:rotate-45="{isMenuOpen}"
								class:-translate-y-1.5="{!isMenuOpen}"
							></span>
							<span
								class="block w-6 h-0.5 bg-base-content row-span-full col-span-full transition-all"
								class:-rotate-45="{isMenuOpen}"
								class:translate-y-1.5="{!isMenuOpen}"
							></span>
						</button>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div>
		<Collapsible
			bind:open="{isMenuOpen}"
			bind:trigger="{menuTrigger}"
		>
			<div class="container flex items-center justify-end pb-6">
				<Navigation />
			</div>
		</Collapsible>
	</div>
</header>
