import type { CollectionConfig } from "payload";

import { triggerDeployAfterChange, triggerDeployAfterDelete } from "../hooks/trigger-deploy";

export const HomeLinks: CollectionConfig = {
    slug: "home-links",
    dbName: "home_links",
    labels: {
        singular: "Home Link",
        plural: "Home Links",
    },
    admin: {
        group: "Settings",
    },
    access: {
        read: () => true,
    },
    hooks: {
        afterChange: [triggerDeployAfterChange],
        afterDelete: [triggerDeployAfterDelete],
    },
    fields: [
        {
            name: "icon",
            type: "text",
            required: true,
        },
        {
            name: "ariaLabel",
            type: "text",
            required: true,
        },
        {
            name: "href",
            type: "text",
            required: true,
        },
    ],
};
