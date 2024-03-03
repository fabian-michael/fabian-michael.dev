export class SafePromiseTimeoutError extends Error {
    constructor(message?: string) {
        super(message ?? 'Promise timed out');
        this.name = 'TimeoutError';
    }
}

interface SafePromiseOptions {
    logErrors?: boolean;
    logger?: (data: unknown[]) => void;
    errorMessage?: string;
    timeout?: number;
}

export async function safePromise<T>(
    promise: Promise<T>,
    options: SafePromiseOptions = {}
): Promise<{ data: T, error?: never } | { data?: never, error: Error }> {
    const {
        logErrors = true,
        logger = console.error,
        timeout = 5000,
        errorMessage = 'Promise rejected',
    } = options;

    let timeoutId: number | null = null,
        timeoutPromise: Promise<never> | null = null;

    if (timeout && timeout > 0) {
        timeoutPromise = new Promise<never>((_, reject) => {
            timeoutId = setTimeout(() => {
                reject(new SafePromiseTimeoutError());
            }, timeout);
        });
    }

    try {
        const result = await Promise.race([promise, timeoutPromise]);
        return {
            data: result as T,
        };
    } catch (err) {
        const error = new Error(errorMessage, { cause: err });
        if (logErrors) {
            logger(error);
        }
        return {
            error,
        };
    } finally {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
    }
}