import type { Icon } from "@tabler/icons-svelte";

export interface IListboxOption<T extends string | number = unknown> {
    value: T;
    label: string;
    icon?: ComponentType<Icon>;
}