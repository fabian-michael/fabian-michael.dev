import { z } from 'zod';

export const schemaClientStep1 = z.object({
	email: z.email({
                error: 'Please enter a valid E-Mail address'
            })
		.trim(),
	full_name: z.string({
        error: (issue) => issue.input === undefined ? 'Please enter your full name' : undefined
    }).trim(),
	phone: z
		.string()
		.trim()
		.optional()
		.or(
			z.string().regex(/^(\+\d{1,4}|\(\+\d{1,4}\)|0+\d{1,5}|\(0+\d{1,5}\))[\d\s\-\/]*\d+$/, {
                error: 'Please enter a valid phone number'
            }),
		),
});

export const schemaClientStep2 = schemaClientStep1.extend({
	company: z.string({
        error: (issue) => issue.input === undefined ? 'Please enter your company name' : undefined
    }).trim(),
	address: z.string({
        error: (issue) => issue.input === undefined ? 'Please enter the company address' : undefined
    }).trim(),
	website: z.url({
                error: 'Please enter a valid URL'
            })
    		.trim(),
	message: z.string({
        error: (issue) => issue.input === undefined ? 'Please enter a message' : undefined
    }).trim(),
});

export const schemaClientStep3 = schemaClientStep2.extend({
	passkey_name: z
		.string({
            error: (issue) => issue.input === undefined ? 'Please enter a name for your passkey' : undefined
        })
		.regex(/^[a-zA-Z0-9\-_]+$/, {
            error: 'Please enter a valid passkey name'
        })
		.trim(),

	passkey: z.object({
		algorithm: z.string(),
		id: z.string(),
		publicKey: z.string(),
	}),

	'cf-turnstile-response': z.string({
        error: (issue) => issue.input === undefined ? 'Please complete the captcha' : undefined
    }),
});
