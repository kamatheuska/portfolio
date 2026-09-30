import type { SanitizedConfig } from "payload";

import payload from "payload";

const adminEmail = process.env.ADMIN_EMAIL ?? "";
const adminPassword = process.env.ADMIN_PASSWORD ?? "";

// Script must define a "script" function export that accepts the sanitized config
export const script = async (config: SanitizedConfig) => {
    await payload.init({ config });

    await payload.create({
        collection: "users",
        data: {
            email: adminEmail,
            password: adminPassword,
        },
    });
    payload.logger.info("Successfully seeded!");
    process.exit(0);
};
