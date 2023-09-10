// See https://kit.svelte.dev/docs/types#app

// for information about these interfaces
declare global {

	interface Window {
		setTheme(theme: 'dark' | 'light' | ''): void;
	}

	namespace App {
		// interface Error {}
		interface Locals {
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };

