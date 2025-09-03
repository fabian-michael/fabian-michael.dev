<script lang="ts">
	import { afterNavigate, onNavigate } from '$app/navigation';
	import '../app.css';
	import { Toaster } from '../lib/components/toaster';
	import Navbar from './Navbar.svelte';

	let showProgress = $state(false);

	onNavigate(() => {
		showProgress = true;
	});

	afterNavigate(() => {
		showProgress = false;
	});
</script>

{#if showProgress}
	<progress class="progress absolute inset-x-0 top-0 z-20 h-0.5 w-full progress-accent"
	></progress>
{/if}

<Toaster>
	<Navbar />

	<slot />
</Toaster>

<style lang="postcss">
</style>
