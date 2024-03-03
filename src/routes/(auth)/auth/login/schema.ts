import { z } from 'zod';

export const schema = z.object({
    email: z.string().email({ message: 'Please enter a valid E-Mail address' }),
    password: z.string().min(1, { message: 'Please enter your password' }),
});

export type Schema = z.infer<typeof schema>;