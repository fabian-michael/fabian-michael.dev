import { z } from 'zod';

export const schema = z.object({
	email: z
		.string({ required_error: 'Please enter your E-Mail address' })
		.email({ message: 'Please enter a valid E-Mail address' }),
	password: z.string({ required_error: 'Please enter your password' }),
	remember_me: z.boolean().optional(),
});

export type Schema = z.infer<typeof schema>;
