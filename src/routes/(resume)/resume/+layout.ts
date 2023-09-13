import { error } from '@sveltejs/kit';

export const load = async ({ }) => {
    // TODO: Implement authorization

    throw error(401, 'Unauthorized');
}