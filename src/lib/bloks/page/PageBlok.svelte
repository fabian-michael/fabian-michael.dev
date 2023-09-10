<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';
	import type { PageBlokData } from './PageBlokData';

	export let blok: PageBlokData;
</script>

{#key blok}
	<div use:storyblokEditable="{blok}">
		{#if blok.title}
			<header class="container my-16">
				<h1 class="text-6xl font-semibold leading-tight">{blok.title}</h1>
			</header>
		{/if}

		{#each blok.content ?? [] as child}
			<StoryblokComponent blok="{child}" />
		{/each}
	</div>
{/key}
