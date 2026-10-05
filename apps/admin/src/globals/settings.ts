import type { GlobalConfig } from "payload";

import { triggerDeployGlobalAfterChange } from "../hooks/trigger-deploy";

export const Settings: GlobalConfig = {
    slug: "settings",
    dbName: "settings",
    label: "Settings",
    admin: {
        group: "Settings",
    },
    access: {
        read: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
    },
    hooks: {
        afterChange: [triggerDeployGlobalAfterChange],
    },
    fields: [
        {
            name: "homeHeading",
            type: "text",
        },
    ],
};
