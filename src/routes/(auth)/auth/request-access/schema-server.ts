import { CF_TURNSTILE_SECRET } from '$env/static/private';
import { makeRequest } from '$lib/utils/fetch';
import { safePromise } from '$lib/utils/safePromise';
import { z } from 'zod';
import { schemaClientStep3 } from './schema-client';

type TurnstileVerificationResponse = {
    success: boolean;
    'error-codes': string[];
    'challenge_ts': string;
    hostname: string;
}

export const schemaServer = schemaClientStep3.extend({
    'cf-turnstile-response': z.string()
        .refine(async (token) => {
            if (
                typeof token !== 'string' ||
                token.length === 0
            ) {
                return false;
            }

            const formData = new FormData();
            formData.append('secret', CF_TURNSTILE_SECRET);
            formData.append('response', token);

            const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
            const [result, err] = await safePromise<TurnstileVerificationResponse>(makeRequest(url, {
                body: formData,
                method: 'POST',
            }), {
                errorMessage: 'Failed to request captcha verification',
            });

            if (err) {
                return false;
            }

            return result.success;

        }, {
            message: 'Captcha verification failed',
        }),
});

export type Schema = z.infer<typeof schemaServer>;