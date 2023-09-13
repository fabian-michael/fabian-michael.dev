import { dev } from '$app/environment';
import { PUBLIC_STORYBLOK_ACCESS_TOKEN } from '$env/static/public';
import { HeroBlok } from '$lib/bloks/hero';
import { PageBlok } from '$lib/bloks/page';
import { TextmediaBlok } from '$lib/bloks/textmedia';
import { apiPlugin, storyblokInit, useStoryblokApi } from "@storyblok/svelte";
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data }) => {

	storyblokInit({
		accessToken: PUBLIC_STORYBLOK_ACCESS_TOKEN,
		use: [apiPlugin],

		apiOptions: {
			https: !dev,
			region: 'eu',
		},

		components: {
			page: PageBlok,
			hero: HeroBlok,
			textmedia: TextmediaBlok
		},
	});
	let storyblokApi = await useStoryblokApi();

	// pass locale to the "rendering context"
	return { storyblokApi }
}
