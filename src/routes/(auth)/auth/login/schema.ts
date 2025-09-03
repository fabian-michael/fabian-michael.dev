import { z } from 'zod';

export const schema = z.object({
	email: z.email({
                error: 'Please enter a valid E-Mail address'
            }),
	password: z.string({
        error: (issue) => issue.input === undefined ? 'Please enter your password' : undefined
    }),
	remember_me: z.boolean().optional(),
});

export type Schema = z.infer<typeof schema>;
