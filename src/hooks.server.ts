import { i18n } from "$lib/server/handle/i18n";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

export const handle: Handle = sequence(i18n);