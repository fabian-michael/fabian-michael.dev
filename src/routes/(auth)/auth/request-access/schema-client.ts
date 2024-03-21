import { z } from 'zod';

export const schemaClientStep1 = z.object({
    email: z.string()
        .email({ message: 'Please enter a valid E-Mail address' })
        .transform((value) => value.trim()),
    full_name: z.string()
        .min(1, { message: 'Please enter your full name' })
        .transform((value) => value.trim()),
    phone: z.string()
        .refine((value) => {
            const regex = /^(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/;
            return !value.trim() || regex.test(value.trim());
        }, { message: 'Please enter a valid phone number' })
        .optional()
        .transform((value) => value?.trim()),
});

export const schemaClientStep2 = schemaClientStep1.extend({
    company: z.string()
        .min(1, { message: 'Please enter your company name' })
        .transform((value) => value.trim()),
    address: z.string()
        .min(1, { message: 'Please enter the company address' })
        .transform((value) => value.trim()),
    website: z.string()
        .refine((value) => {
            const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
            return !value.trim() || regex.test(value.trim());
        }, { message: 'Please enter a valid URL' })
        .optional()
        .transform((value) => value?.trim()),
    message: z.string()
        .min(1, { message: 'Please enter a message' })
        .transform((value) => value.trim()),

    'cf-turnstile-response': z.string()
        .min(1, { message: 'Please complete the captcha' }),
});