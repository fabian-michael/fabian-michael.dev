import type { SelectOption } from '@melt-ui/svelte';
import type { SvelteComponent } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';

export interface IListboxOption<T extends string | number = unknown> extends SelectOption<T> {
    icon?: ComponentType<SvelteComponent<SvelteHTMLElements['svg']>>;
}
