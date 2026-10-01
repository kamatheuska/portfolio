import type { CollectionConfig } from "payload";

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
