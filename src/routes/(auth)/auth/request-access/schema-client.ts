import { z } from 'zod';

export const schemaClientStep1 = z.object({
    email: z
        .string({ required_error: 'Please enter your E-Mail address' })
        .email({ message: 'Please enter a valid E-Mail address' })
        .transform((value) => value.trim()),
    full_name: z
        .string({ required_error: 'Please enter your full name' })
        .transform((value) => value.trim()),
    phone: z
        .string()
        .regex(
            /^(?:([+]\d{1,4})[\-.\s]?)?(?:\((\d{1,3})\)[\-.\s]?)?(\d{1,4})[\-.\s]?(\d{1,4})[\-.\s]?(\d{1,9})$/,
            { message: 'Please enter a valid phone number' }
        )
        .optional()
        .transform((value) => value?.trim()),
});

export const schemaClientStep2 = schemaClientStep1.extend({
    company: z
        .string({ required_error: 'Please enter your company name' })
        .transform((value) => value.trim()),
    address: z
        .string({ required_error: 'Please enter the company address' })
        .transform((value) => value.trim()),
    website: z
        .string()
        .url({ message: 'Please enter a valid URL' })
        .optional(),
    message: z
        .string({ required_error: 'Please enter a message' })
        .transform((value) => value.trim()),

    'cf-turnstile-response': z
        .string({ required_error: 'Please complete the captcha' }),
});