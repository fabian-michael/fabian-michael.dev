import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
    const { storyblokApi } = await parent();

    const dataStory = await storyblokApi.get("cdn/stories/legal-notice", {
        version: "draft",
    });

    return {
        story: dataStory.data.story
    };
}) satisfies PageLoad;