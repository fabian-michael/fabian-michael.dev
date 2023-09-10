<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';
	import type { PageBlokData } from './PageBlokData';

	export let blok: PageBlokData;
</script>

{#key blok}
	<div use:storyblokEditable="{blok}">
		{#each blok.content ?? [] as child}
			<StoryblokComponent blok="{child}" />
		{/each}
	</div>
{/key}
