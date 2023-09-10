<script lang="ts">
	import { Listbox, type IListboxOption } from '$components/listbox';
	import { IconMoon, IconSun, IconSunMoon } from '@tabler/icons-svelte';
	import { onMount } from 'svelte';

	type Theme = 'dark' | 'light' | '';

	let mounted = false;
	let selectedTheme: Theme = '';
	let options: IListboxOption<Theme>[] = [
		{
			value: 'dark',
			label: 'Dark',
			icon: IconMoon,
		},
		{
			value: 'light',
			label: 'Light',
			icon: IconSun,
		},
		{
			value: '',
			label: 'System',
			icon: IconSunMoon,
		},
	];

	$: if (mounted) {
		window.setTheme(selectedTheme);
	}

	onMount(() => {
		mounted = true;
		selectedTheme = localStorage.getItem('theme') as Theme;
	});
</script>

<Listbox
	{options}
	bind:value="{selectedTheme}"
/>
