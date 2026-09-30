import type { GlobalConfig } from "payload";

export const Settings: GlobalConfig = {
    slug: "settings",
    access: {
        read: () => true,
    },
    fields: [
        {
            name: "homeHeading",
            type: "text",
        },
        {
            name: "homeLinks",
            type: "array",
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
        },
    ],
};
