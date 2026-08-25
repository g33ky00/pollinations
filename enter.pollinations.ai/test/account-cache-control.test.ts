import { SELF } from "cloudflare:test";
import { describe, expect } from "vitest";

describe("GET /api/account/* cache headers", () => {
    test("profile returns no-store cache headers", async ({ sessionToken }) => {
        const res = await SELF.fetch("http://localhost:3000/api/account/profile", {
            headers: {
                Cookie: `better-auth.session_token=${sessionToken}`,
            },
        });

        expect(res.status).toBe(200);
        expect(res.headers.get("Cache-Control")).toBe(
            "private, no-store, max-age=0",
        );
        expect(res.headers.get("Pragma")).toBe("no-cache");
    });

    test("my-models returns no-store cache headers", async ({
        sessionToken,
    }) => {
        const res = await SELF.fetch(
            "http://localhost:3000/api/account/my-models",
            {
                headers: {
                    Cookie: `better-auth.session_token=${sessionToken}`,
                },
            },
        );

        expect(res.status).toBe(200);
        expect(res.headers.get("Cache-Control")).toBe(
            "private, no-store, max-age=0",
        );
        expect(res.headers.get("Pragma")).toBe("no-cache");
    });
});
