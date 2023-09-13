<script lang="ts">
	import { Avatar } from '$components/avatar';
	import { renderRichText, storyblokEditable } from '@storyblok/svelte';
	import { IconBuildingSkyscraper, IconClock, IconMapPin } from '@tabler/icons-svelte';
	import { format } from 'date-fns';
	import { readable } from 'svelte/store';
	import type { HeroBlokData } from './HeroBlokData';

	export let blok: HeroBlokData;

	const timeZone = 'Europe/Berlin';
	const time = readable(new Date(), (set) => {
		const interval = setInterval(() => {
			set(new Date());
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

{#key blok}
	<div
		class="py-16 space-y-16"
		use:storyblokEditable="{blok}"
	>
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

				<div class="prose">
					{@html renderRichText(blok.text)}
				</div>
				<div class="flex flex-col sm:flex-row gap-4">
					<small>
						<IconBuildingSkyscraper
							size="1.5em"
							class="inline-block"
						/>
						<a
							class="link link-hover"
							href="https://form4.de"
							target="_blank"
							rel="noopener noreferrer"
						>
							form4 GmbH & Co. KG
						</a>
					</small>

					<small>
						<IconMapPin
							size="1.5em"
							class="inline-block"
						/>
						Berlin, Germany
					</small>

					<small class="font-mono">
						<IconClock
							size="1.5em"
							class="inline-block"
						/>
						{format($time, 'HH:mm:ss', { timeZone })}
					</small>
				</div>
			</div>
		</div>
	</div>
{/key}
