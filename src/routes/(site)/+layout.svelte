<script lang="ts">
	import Footer from './Footer.svelte';
	import Header from './Header.svelte';
</script>

<svelte:head>
	<meta
		name="author"
		content="Fabian Michael"
	/>
	<meta
		name="copyright"
		content="Fabian Michael"
	/>
</svelte:head>

<Header />

<main>
	<slot />
</main>

<Footer />
