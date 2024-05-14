import { z } from 'zod';

export const schemaClientStep1 = z.object({
    email: z
        .string({ required_error: 'Please enter your E-Mail address' })
        .email({ message: 'Please enter a valid E-Mail address' })
        .trim(),
    full_name: z
        .string({ required_error: 'Please enter your full name' })
        .trim(),
    phone: z
        .string()
        .trim()
        .optional()
        .or(
            z
                .string()
                .regex(
                    /^(\+\d{1,4}|\(\+\d{1,4}\)|0+\d{1,5}|\(0+\d{1,5}\))[\d\s\-\/]*\d+$/,
                    { message: 'Please enter a valid phone number' }
                )
        ),
});

export const schemaClientStep2 = schemaClientStep1.extend({
    company: z
        .string({ required_error: 'Please enter your company name' })
        .trim(),
    address: z
        .string({ required_error: 'Please enter the company address' })
        .trim(),
    website: z
        .string({ required_error: 'Please enter the company website' })
        .trim()
        .url({ message: 'Please enter a valid URL' }),
    message: z
        .string({ required_error: 'Please enter a message' })
        .trim(),
});

export const schemaClientStep3 = schemaClientStep2.extend({
    passkey_name: z
        .string({ required_error: 'Please enter a name for your passkey' })
        .regex(/^[a-zA-Z0-9\-_]+$/, { message: 'Please enter a valid passkey name' })
        .trim(),

    passkey: z
        .object({
            algorithm: z.string(),
            id: z.string(),
            publicKey: z.string(),
        }),

    'cf-turnstile-response': z
        .string({ required_error: 'Please complete the captcha' }),
});