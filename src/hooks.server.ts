import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { session } from './hooks/session';

export const handle: Handle = sequence(
    session
);