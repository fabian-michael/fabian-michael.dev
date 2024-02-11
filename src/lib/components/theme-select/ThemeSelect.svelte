<script lang="ts">
	import { Icon } from '$components/icon';
	import { Listbox, type IListboxOption } from '$components/listbox';
	import { themeStore, type Theme } from '$lib/client/stores/theme-store';
	import { melt } from '@melt-ui/svelte';
	import PhGearFine from '~icons/ph/gear-fine';
	import TablerMoonStars from '~icons/tabler/moon-stars';
	import TablerSun from '~icons/tabler/sun';
	import TablerSunMoon from '~icons/tabler/sun-moon';

	let options: IListboxOption<Theme>[] = [
		{
			value: 'night',
			label: 'Dark',
			icon: TablerMoonStars,
		},
		{
			value: 'light',
			label: 'Light',
			icon: TablerSun,
		},
		{
			value: '',
			label: 'System',
			icon: TablerSunMoon,
		},
	];

	let listboxTrigger: any;
	let loading = $state(true);
	const selectedTheme = $derived($themeStore);
	const icon = $derived(options.find((option) => option.value === selectedTheme)?.icon);

	$effect(() => {
		loading = selectedTheme === undefined || listboxTrigger === undefined;
	});
</script>

<Listbox
	{options}
	value={selectedTheme}
	defaultValue="night"
	onchange={({ next }) => {
		themeStore.set(next?.value ?? 'night');
		return next;
	}}
	triggerRef={(trigger) => (listboxTrigger = trigger)}
>
	{#if loading}
		<span class="btn btn-ghost btn-square">
			<span class="text-white loading loading-spinner"></span>
		</span>
	{:else}
		<button
			class="text-lg btn btn-ghost btn-square"
			use:melt={$listboxTrigger}
		>
			{#if icon}
				<Icon {icon} />
			{:else}
				<PhGearFine />
			{/if}
		</button>
	{/if}
</Listbox>
