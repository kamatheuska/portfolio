// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type Hooks = typeof import("@/hooks/trigger-deploy");

const logger = { info: vi.fn(), error: vi.fn() };
const fetchMock = vi.fn();

const args = (context: Record<string, unknown> = {}) =>
    ({
        doc: { id: 1 },
        req: { context, payload: { logger } },
    }) as never;

const setEnv = () => {
    vi.stubEnv("CLOUDFLARE_API_TOKEN", "token");
    vi.stubEnv("CLOUDFLARE_ACCOUNT_ID", "account");
    vi.stubEnv("CLOUDFLARE_PAGES_PROJECT", "project");
};

describe("trigger-deploy hooks", () => {
    let hooks: Hooks;

    beforeEach(async () => {
        vi.resetModules();
        vi.useFakeTimers();
        vi.stubEnv("CLOUDFLARE_API_TOKEN", "");
        vi.stubEnv("CLOUDFLARE_ACCOUNT_ID", "");
        vi.stubEnv("CLOUDFLARE_PAGES_PROJECT", "");
        fetchMock.mockResolvedValue(
            new Response(JSON.stringify({ success: true, result: { id: "d1", url: "https://d1" } })),
        );
        vi.stubGlobal("fetch", fetchMock);
        hooks = await import("@/hooks/trigger-deploy");
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.unstubAllEnvs();
        vi.unstubAllGlobals();
        vi.clearAllMocks();
    });

    it("coalesces a burst of changes into one deployment", async () => {
        setEnv();

        expect(hooks.triggerDeployAfterChange(args())).toEqual({ id: 1 });
        expect(hooks.triggerDeployAfterDelete(args())).toEqual({ id: 1 });
        expect(hooks.triggerDeployGlobalAfterChange(args())).toEqual({ id: 1 });

        expect(fetchMock).not.toHaveBeenCalled();
        await vi.advanceTimersByTimeAsync(hooks.DEPLOY_DEBOUNCE_MS);

        expect(fetchMock).toHaveBeenCalledTimes(1);
        const [url, init] = fetchMock.mock.calls[0];
        expect(url).toBe(
            "https://api.cloudflare.com/client/v4/accounts/account/pages/projects/project/deployments",
        );
        expect(init.method).toBe("POST");
        expect(init.headers).toEqual({ Authorization: "Bearer token" });
        expect(logger.info).toHaveBeenCalledWith(
            { id: "d1", url: "https://d1" },
            "Cloudflare Pages deployment triggered",
        );
    });

    it("does nothing when env is not configured", async () => {
        hooks.triggerDeployAfterChange(args());
        hooks.triggerDeployAfterChange(args());
        await vi.advanceTimersByTimeAsync(hooks.DEPLOY_DEBOUNCE_MS);

        expect(fetchMock).not.toHaveBeenCalled();
        expect(logger.info).toHaveBeenCalledTimes(1);
    });

    it("skips when context.skipDeploy is set", async () => {
        setEnv();

        hooks.triggerDeployAfterChange(args({ skipDeploy: true }));
        await vi.advanceTimersByTimeAsync(hooks.DEPLOY_DEBOUNCE_MS);

        expect(fetchMock).not.toHaveBeenCalled();
    });

    it("logs instead of throwing when the request fails", async () => {
        setEnv();
        fetchMock.mockRejectedValueOnce(new Error("network"));

        expect(hooks.triggerDeployAfterChange(args())).toEqual({ id: 1 });
        await vi.advanceTimersByTimeAsync(hooks.DEPLOY_DEBOUNCE_MS);

        expect(logger.error).toHaveBeenCalledTimes(1);
    });

    it("logs an error on a non-success API response", async () => {
        setEnv();
        fetchMock.mockResolvedValueOnce(
            new Response(
                JSON.stringify({
                    success: false,
                    errors: [{ code: 10000, message: "Authentication error" }],
                }),
                {
                    status: 403,
                },
            ),
        );

        hooks.triggerDeployAfterChange(args());
        await vi.advanceTimersByTimeAsync(hooks.DEPLOY_DEBOUNCE_MS);

        expect(logger.error).toHaveBeenCalledWith(
            { status: 403, errors: [{ code: 10000, message: "Authentication error" }] },
            "Cloudflare Pages deployment trigger failed",
        );
    });
});
