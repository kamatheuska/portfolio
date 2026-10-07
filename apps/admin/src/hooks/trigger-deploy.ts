import type {
    CollectionAfterChangeHook,
    CollectionAfterDeleteHook,
    GlobalAfterChangeHook,
    Payload,
} from "payload";

// Changes within this window are coalesced into a single deployment
export const DEPLOY_DEBOUNCE_MS = 5000;

type CloudflareResponse = {
    success: boolean;
    errors?: { code: number; message: string }[];
    result?: { id: string; url: string } | null;
};

let timer: ReturnType<typeof setTimeout> | undefined;
let warnedDisabled = false;

const deploy = async (payload: Payload, url: string, token: string) => {
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            // Endpoint expects multipart; an empty form builds the production branch
            body: new FormData(),
        });
        const body = (await res.json().catch(() => null)) as CloudflareResponse | null;

        if (!res.ok || !body?.success) {
            payload.logger.error(
                { status: res.status, errors: body?.errors },
                "Cloudflare Pages deployment trigger failed",
            );
            return;
        }

        payload.logger.info(
            { id: body.result?.id, url: body.result?.url },
            "Cloudflare Pages deployment triggered",
        );
    } catch (err) {
        payload.logger.error({ err }, "Cloudflare Pages deployment trigger failed");
    }
};

function scheduleDeploy(payload: Payload) {
    const token = process.env.CLOUDFLARE_API_TOKEN;
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const project = process.env.CLOUDFLARE_PAGES_PROJECT;
    const appEnv = process.env.APP_ENV ?? "production";

    if (!token || !accountId || !project) {
        if (!warnedDisabled) {
            warnedDisabled = true;
            payload.logger.info(
                "Cloudflare deploy trigger disabled: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_PAGES_PROJECT is not set",
            );
        }
        return;
    }

    const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${project}/deployments`;
    payload.logger.info(
        {
            context: {
                url,
                deployDebounceMs: DEPLOY_DEBOUNCE_MS,
                appEnv,
                project,
                accountId: accountId.slice(0, 4) + "...",
                token: token.slice(0, 4) + "...",
            },
        },
        `Scheduling Cloudflare Pages deployment trigger for ${url} in ${DEPLOY_DEBOUNCE_MS}ms`,
    );

    if (appEnv !== "production") {
        payload.logger.info(
            `Cloudflare Pages deployment trigger skipped: APP_ENV is set to "${appEnv}" (not "production")`,
        );
        return;
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
        timer = undefined;
        void deploy(payload, url, token);
    }, DEPLOY_DEBOUNCE_MS);
    // Don't keep short-lived processes (e.g. payload bin scripts) alive
    timer.unref();
}

export const triggerDeployAfterChange: CollectionAfterChangeHook = ({ doc, req }) => {
    if (!req.context.skipDeploy) scheduleDeploy(req.payload);
    return doc;
};

export const triggerDeployAfterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
    if (!req.context.skipDeploy) scheduleDeploy(req.payload);
    return doc;
};

export const triggerDeployGlobalAfterChange: GlobalAfterChangeHook = ({ doc, req }) => {
    if (!req.context.skipDeploy) scheduleDeploy(req.payload);
    return doc;
};
