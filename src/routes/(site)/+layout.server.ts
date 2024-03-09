import type { LayoutServerLoad } from '../$types';

export const config = {
    isr: {
        expiration: 60,
    },
};

export const load: LayoutServerLoad = async ({ locals }) => {
    const data: App.PageData = {
    };

    if (locals.session?.user) {
        data.user = {
            email: locals.session.user.email,
        };
    }

    return data;
};
