import { supabase } from "$lib/server/hooks/supabase/supabase";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

export const handle: Handle = sequence(
    supabase,
);