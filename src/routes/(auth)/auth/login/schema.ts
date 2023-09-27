import { z } from "zod";

export const schema = z.object({
    email: z.string().email(),
    password: z.string().nonempty(),
});

export type Schema = z.infer<typeof schema>;