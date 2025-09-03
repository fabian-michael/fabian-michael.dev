import { browser } from '$app/environment';
import { makeRequest } from '$lib/utils/fetch';
import { safePromise } from '$lib/utils/safePromise';

class UserStore {
	private $user = $state<App.FrontendUser | null>(null);

	constructor() {
		if (browser) {
			this.fetchUser();
		}
	}

	public get user() {
		return this.$user;
	}

	public fetchUser() {
		safePromise(makeRequest<App.FrontendUser>('/api/user'), {
			errorMessage: 'Failed to fetch user',
		}).then(([user]) => {
			if (user) {
				this.$user = user;
			}
		});
	}
}

export const userStore = new UserStore();
