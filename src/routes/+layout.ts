import { dev } from '$app/environment';
import { PUBLIC_STORYBLOK_ACCESS_TOKEN, PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { HeroBlok } from '$lib/bloks/hero';
import { PageBlok } from '$lib/bloks/page';
import { TextmediaBlok } from '$lib/bloks/textmedia';
import { apiPlugin, storyblokInit, useStoryblokApi } from "@storyblok/svelte";
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	depends('supabase:auth')

	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session,
	})

	const {
		data: { session },
	} = await supabase.auth.getSession()

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

	return {
		supabase,
		session,
		storyblokApi,
	};
}
