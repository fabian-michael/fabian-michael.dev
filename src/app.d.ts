// See https://kit.svelte.dev/docs/types#app

import type { Session, SupabaseClient } from "@supabase/supabase-js";

// for information about these interfaces
declare global {

	interface Window {
		setTheme(theme: 'dark' | 'light' | ''): void;
		getTheme(): 'dark' | 'light' | '';
	}

	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Platform {}
	}
}

export { };

