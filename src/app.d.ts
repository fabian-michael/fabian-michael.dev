// See https://kit.svelte.dev/docs/types#app
import 'unplugin-icons/types/svelte';

import type { Theme } from '$lib/client/stores/theme-store';

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

	namespace Payload {
		type ImageProperties = {
			filename: string;
			filesize: number;
			height: number;
			mimeType: string;
			url: string;
			width: number;
		}

		type Image = ImageProperties & {
			id: string;
			sizes: {
				[key: string]: ImageProperties;
			},
		}

		type Collection = {
			id: string;
			_status: 'published' | 'draft';
			createdAt: string;
			updatedAt: string;
		}

		type CollectionResponse<T extends Collection> = {
			docs: T[];
			totalDocs: number;
			limit: number;
			totalPages: number;
			page: number;
			pagingCounter: number;
			hasPrevPage: boolean;
			hasNextPage: boolean;
			prevPage: number | null;
			nextPage: number | null;
		}

		namespace Collections {
			type BlogPostings = Collection & {
				image: Image;
				title: string;
				abstract: string;
				slug: string;
				text_html: string;
			}
		}

		namespace Globals {
			type Home = {
				general: {
					title: string;
				},
				hero: {
					text_html: string;
					image: Image;
				}
			}

			type LegalNotice = {
				title: string;
				text_html: string;
			}
		}

		namespace Auth {
			type User = {
				id: string;
				email: string;
				createdAt: string;
				updatedAt: string;
			}

			type LoginResponse = {
				user: User;
				token: string;
				exp: number;
			}
		}
	}
}

export { };

