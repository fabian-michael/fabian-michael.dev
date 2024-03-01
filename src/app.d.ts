// See https://kit.svelte.dev/docs/types#app
import 'unplugin-icons/types/svelte';

import type { Theme } from "$lib/client/stores/theme-store";

// for information about these interfaces
declare global {

	interface Window {
		setTheme(theme: Theme): void;
	}

	namespace App {
		interface FlashMessage {
			type: 'info' | 'success' | 'warning' | 'error';
			title?: string;
			message: string;
		}
		// interface Error {}
		interface Locals {
		}
		interface PageData {
			flash?: FlashMessage;
		}
		interface ActionData {
			flash?: FlashMessage;
		}
		// interface Platform {}
	}
}

export { };

