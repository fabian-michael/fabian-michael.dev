<script lang="ts">
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';
	import type { TextmediaBlokData } from './TextmediaBlokData';

	export let blok: TextmediaBlokData;
	$: header = blok.header;
	$: header_layout = blok.header_layout;
	$: bodytext = blok.bodytext;
</script>

{#key blok}
	<div class="container my-16">
		<article
			class="prose"
			use:storyblokEditable="{blok}"
		>
			{#if header && header_layout}
				<svelte:element this="{'h' + header_layout}">
					{header}
				</svelte:element>
			{:else if header}
				<!-- visually hidden heading -->
				<h6 class="sr-only">{header}</h6>
			{/if}

			{#if bodytext}
				{@html renderRichText(bodytext)}
			{/if}
		</article>
	</div>
{/key}
