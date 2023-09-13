import { error, type Handle } from "@sveltejs/kit";

export const authenticate: Handle = async ({ event, resolve }) => {
    // TODO: Implement authentication

    return await resolve(event);

}

export const authorize: Handle = async ({ event, resolve }) => {
    // TODO: Implement authorization

    if (event.url.pathname.startsWith('/resume')) {
        throw error(401, 'Unauthorized');
    }

    return await resolve(event);
};