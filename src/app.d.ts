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

		interface SessionUser {
			email: string;
			token: string;
		}

		interface FrontendUser {
			email: string;
		}

		interface Session {
			id: string;
			user?: SessionUser;
			challenge?: string;
		}

		// interface Error {}
		interface Locals {
			session?: Session;
		}
		interface PageData {
			flash?: FlashMessage;
		}
		interface ActionData {
			flash?: FlashMessage;
		}
		interface PageState {
			step?: number;
			formState?: unknown;
		}
		// interface Platform {}
	}

	namespace Payload {
		interface ImageProperties {
			filename: string;
			filesize: number;
			height: number;
			mimeType: string;
			url: string;
			width: number;
		}

		interface Image extends ImageProperties {
			id: string;
			sizes: {
				[key: string]: ImageProperties;
			};
		}

		interface Collection {
			id: string;
			_status: 'published' | 'draft';
			createdAt: string;
			updatedAt: string;
		}

		interface CollectionResponse<T extends Collection> {
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
			interface BlogPostings extends Collection {
				image: Image;
				title: string;
				abstract: string;
				slug: string;
				text_html: string;
			}
		}

		namespace Globals {
			interface Home {
				general: {
					title: string;
				};
				hero: {
					text_html: string;
					image: Image;
				};
			}

			interface LegalNotice {
				title: string;
				text_html: string;
			}

			interface Resume {
				contact: {
					avatar?: Image;
					address: string;
					phone: string;
					email: string;
				};

				about: {
					job_title: string;
					profile_html: string;
				};

				experience: {
					entries: Array<{
						company: string;
						job_title: string;
						is_current_job: boolean;
						start_date: string;
						end_date?: string;
						description_html: string;
					}>;
				};

				education: {
					entries: Array<{
						institution: string;
						title: string;
						start_date: string;
						end_date: string;
						description_html: string;
					}>;
				};
			}
		}

		namespace Auth {
			interface User {
				id: string;
				email: string;
				createdAt: string;
				updatedAt: string;
			}

			interface LoginResponse {
				user: User;
				token: string;
				exp: number;
			}

			interface RefreshTokenResponse {
				exp: number;
				refreshedToken: string;
				user: User;
			}
		}
	}
}

export {};
