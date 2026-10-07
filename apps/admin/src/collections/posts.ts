import type { CollectionConfig, FieldHook } from "payload";
import { slugField } from "payload";

import {
    triggerDeployAfterPublishedChange,
    triggerDeployAfterPublishedDelete,
} from "../hooks/trigger-deploy";

// Stamp the publish date the first time a post is published
function setPublishedAt({ value, siblingData }: Parameters<FieldHook>[0]) {
    if (!value && siblingData?._status === "published") return new Date().toISOString();
    return value;
}

export const Posts: CollectionConfig = {
    slug: "posts",
    dbName: "posts",
    labels: {
        singular: "Post",
        plural: "Posts",
    },
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "slug", "publishedAt", "_status"],
    },
    defaultSort: "-publishedAt",
    versions: {
        drafts: true,
    },
    access: {
        read: ({ req: { user } }) => Boolean(user),
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
        delete: ({ req: { user } }) => Boolean(user),
    },
    hooks: {
        afterChange: [triggerDeployAfterPublishedChange],
        afterDelete: [triggerDeployAfterPublishedDelete],
    },
    fields: [
        {
            type: "tabs",
            tabs: [
                {
                    label: "Content",
                    fields: [
                        {
                            name: "title",
                            type: "text",
                            required: true,
                        },
                        {
                            name: "heroImage",
                            type: "upload",
                            relationTo: "media",
                            required: true,
                        },
                        {
                            name: "excerpt",
                            type: "textarea",
                            admin: {
                                description: "Short summary shown on post lists and cards",
                            },
                        },
                        {
                            name: "body",
                            type: "richText",
                            required: true,
                        },
                    ],
                },
                {
                    label: "SEO",
                    fields: [
                        {
                            name: "metaTitle",
                            type: "text",
                            maxLength: 60,
                            admin: {
                                description: "Defaults to the post title",
                            },
                        },
                        {
                            name: "metaDescription",
                            type: "textarea",
                            maxLength: 160,
                            admin: {
                                description: "Defaults to the excerpt",
                            },
                        },
                        {
                            name: "ogImage",
                            label: "Social Share Image",
                            type: "upload",
                            relationTo: "media",
                            admin: {
                                description: "Defaults to the hero image",
                            },
                        },
                        {
                            name: "canonicalUrl",
                            type: "text",
                            admin: {
                                description: "Only set when the post was first published elsewhere",
                            },
                        },
                    ],
                },
            ],
        },
        slugField({ position: "sidebar" }),
        {
            name: "publishedAt",
            type: "date",
            index: true,
            admin: {
                position: "sidebar",
                date: { pickerAppearance: "dayAndTime" },
                description: "Set automatically on first publish",
            },
            hooks: {
                beforeChange: [setPublishedAt],
            },
        },
        {
            name: "tags",
            type: "text",
            hasMany: true,
            admin: {
                position: "sidebar",
            },
        },
    ],
};
