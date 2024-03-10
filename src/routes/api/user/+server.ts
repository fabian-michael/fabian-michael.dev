import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({ locals }) => {
    let user: App.FrontendUser | null = null;

    if (locals.session?.user) {
        user = {
            email: locals.session.user.email,
        };
    }

    return new Response(JSON.stringify(user), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}