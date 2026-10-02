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
        read: () => true,
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
