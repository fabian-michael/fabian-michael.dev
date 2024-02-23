<script lang="ts">
	import '../app.css';
	import Navbar from './Navbar.svelte';

	export let data;
</script>

<Navbar />

<slot />

<style lang="postcss">
</style>
