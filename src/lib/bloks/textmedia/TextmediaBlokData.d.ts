import type { ISbRichtext, SbBlokData } from "@storyblok/svelte";
import type { ISbAsset } from "../ISbAsset";

export interface TextmediaBlokData extends SbBlokData {
    header?: string;
    header_layout?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    bodytext?: ISbRichtext;
    assets?: ISbAsset[];
}