import type { CollectionConfig } from "payload";

import { triggerDeployAfterChange, triggerDeployAfterDelete } from "../hooks/trigger-deploy";

export const Media: CollectionConfig = {
    slug: "media",
    access: {
        read: () => true,
    },
    hooks: {
        afterChange: [triggerDeployAfterChange],
        afterDelete: [triggerDeployAfterDelete],
    },
    fields: [
        {
            name: "alt",
            type: "text",
            required: true,
        },
    ],
    upload: true,
};
