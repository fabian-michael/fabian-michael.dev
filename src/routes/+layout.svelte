<script lang="ts">
	import '../app.css';
	import { Toaster } from '../lib/components/toaster';
	import Navbar from './Navbar.svelte';

	export let data;
</script>

<Toaster>
	<Navbar />

	<slot />
</Toaster>

<style lang="postcss">
</style>
