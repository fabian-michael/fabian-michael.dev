import { authenticate, authorize } from "$lib/server/hooks/auth/auth";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

export const handle: Handle = sequence(authenticate, authorize);