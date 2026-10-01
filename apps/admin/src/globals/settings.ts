import type { GlobalConfig } from "payload";

export const Settings: GlobalConfig = {
    slug: "settings",
    dbName: "settings",
    label: "Settings",
    admin: {
        group: "Settings",
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: "homeHeading",
            type: "text",
        },
    ],
};
