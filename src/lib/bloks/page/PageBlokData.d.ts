import type { SbBlokData } from "@storyblok/svelte";

export interface PageBlokData extends SbBlokData {
    title?: string;
    content: SbBlokData[];
}