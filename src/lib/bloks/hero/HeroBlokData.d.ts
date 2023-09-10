import type { ISbRichtext } from "@storyblok/svelte";
import type { ISbAsset } from "../ISbAsset";

export interface HeroBlokData extends SbBlokData {
    headline: ISbRichtext;
    text: ISbRichtext;
    avatar: ISbAsset;
}