import { ADMIN_BASE_URL, ADMIN_API_KEY } from "astro:env/server";

const DEFAULT_TIMEOUT_MS = 10_000;
const API_KEY_COLLECTION = "users";

export class AdminApiError extends Error {
    constructor(
        message: string,
        readonly url: string,
        readonly status?: number,
        readonly body?: string,
        options?: ErrorOptions,
    ) {
        super(message, options);
        this.name = "AdminApiError";
    }
}

interface AdminFetchInit extends RequestInit {
    timeoutMs?: number;
}

export async function adminFetch(
    path: string,
    { timeoutMs = DEFAULT_TIMEOUT_MS, ...init }: AdminFetchInit = {},
) {
    const url = `${ADMIN_BASE_URL}${path}`;

    const headers = new Headers(init.headers);
    headers.set(
        "Authorization",
        `${API_KEY_COLLECTION} API-Key ${ADMIN_API_KEY}`,
    );

    const timeout = AbortSignal.timeout(timeoutMs);
    const signal = init.signal ? AbortSignal.any([init.signal, timeout]) : timeout;

    // TODO: remove build debug logs
    console.log("[admin-client] request", {
        url,
        hasApiKey: Boolean(ADMIN_API_KEY),
        apiKeyLength: ADMIN_API_KEY?.length ?? 0,
    });

    let response: Response;
    try {
        response = await fetch(url, { ...init, headers, signal });
        console.log("[admin-client] response", {
            url,
            status: response.status,
        });
    } catch (error) {
        const cause = (error as { cause?: unknown }).cause;
        console.error("[admin-client] fetch threw", {
            url,
            error,
            cause,
            nestedErrors:
                cause instanceof AggregateError ? cause.errors : undefined,
        });
        const message = timeout.aborted
            ? `Request timed out after ${timeoutMs}ms`
            : "Request failed";
        throw new AdminApiError(message, url, undefined, undefined, { cause: error });
    }

    if (!response.ok) {
        const body = await response.text().catch(() => undefined);
        throw new AdminApiError(
            `Request failed with status ${response.status}`,
            url,
            response.status,
            body,
        );
    }

    return response;
}

export async function adminFetchJson<T>(path: string, init?: AdminFetchInit) {
    const response = await adminFetch(path, init);

    try {
        return (await response.json()) as T;
    } catch (error) {
        throw new AdminApiError(
            "Response body is not valid JSON",
            response.url,
            response.status,
            undefined,
            { cause: error },
        );
    }
}
