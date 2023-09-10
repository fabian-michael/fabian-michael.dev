<script lang="ts">
	import { Avatar } from '$components/avatar';
	import { renderRichText } from '@storyblok/svelte';
	import { IconBuildingSkyscraper } from '@tabler/icons-svelte';
	import type { HeroBlokData } from './HeroBlokData';

	export let blok: HeroBlokData;
</script>

<div class="py-16 space-y-16">
	<div class="container">
		<div class="max-w-lg space-y-6">
			<Avatar
				src="{blok.avatar.filename}"
				name="Fabian Michael"
				size="large"
			/>
			<div class="">
				<h1 class="text-6xl font-semibold leading-tight">
					{@html renderRichText(blok.headline)}
				</h1>
			</div>
			<p>
				<small class="inline-flex items-center gap-2">
					<IconBuildingSkyscraper size="{18}" />
					<a
						class="link link-hover"
						href="https://form4.de"
						target="_blank"
						rel="noopener noreferrer"
					>
						form4 GmbH & Co. KG, Berlin
					</a>
				</small>
			</p>

			<div class="prose">
				{@html renderRichText(blok.text)}
			</div>
		</div>
	</div>
</div>
