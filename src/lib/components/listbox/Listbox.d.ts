import type { SelectOption } from "@melt-ui/svelte";
import type { Icon } from "@tabler/icons-svelte";

export interface IListboxOption<T extends string | number = unknown> extends SelectOption<T> {
    value: T;
    label: string;
    icon?: ComponentType<Icon>;
}