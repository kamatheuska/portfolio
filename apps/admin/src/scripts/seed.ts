import type { SanitizedConfig } from "payload";

import payload from "payload";

const adminEmail = process.env.ADMIN_EMAIL ?? "";
const adminPassword = process.env.ADMIN_PASSWORD ?? "";
const appUserEmail = process.env.APP_USER_EMAIL ?? "";
const appUserPassword = process.env.APP_USER_PASSWORD ?? "";
const appUserApiKey = process.env.APP_USER_API_KEY ?? "";

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

    await payload.create({
        collection: "users",
        data: {
            email: appUserEmail,
            password: appUserPassword,
            apiKey: appUserApiKey,
        },
    });

    const social = [
        {
            href: "mailto:nicolas@matizlab.com",
            aria_label: "Get in touch",
            icon: "mdi:envelope",
        },
        {
            href: "https://www.linkedin.com/in/nicolasramirezdev",
            aria_label: "Link to LinkedIn Profile",
            icon: "mdi:linkedin",
        },
        {
            href: "http://www.instagram.com/nicoramirezdev",
            aria_label: "Link to Instagram Profile",
            icon: "mdi:instagram",
        },
        {
            href: "https://www.github.com/kamatheuska",
            aria_label: "Link to Github Profile",
            icon: "mdi:github",
        },
        {
            href: "https://stackoverflow.com/u/7868769",
            aria_label: "Link to Stackoverflow Profile",
            icon: "mdi:stack-overflow",
        },
    ];

    for (const link of social) {
        await payload.create({
            collection: "home-links",
            data: {
                href: link.href,
                ariaLabel: link.aria_label,
                icon: link.icon,
            },
        });
    }

    const homeHeading = "I am Software Developer specialized on creating great products for the web";

    await payload.updateGlobal({
        slug: "settings",
        data: {
            homeHeading,
        },
    });

    payload.logger.info("Successfully seeded!");
    process.exit(0);
};
