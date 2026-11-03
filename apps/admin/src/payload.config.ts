import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { cloudStoragePlugin } from "@payloadcms/plugin-cloud-storage";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/users";
import { Media } from "./collections/media";
import { Settings } from "./globals/settings";
import { HomeLinks } from "./collections/home-links";
import { Posts } from "./collections/posts";
import { cloudinaryAdapter } from "./lib/cloudinary-adapter";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    bin: [
        {
            scriptPath: path.resolve(dirname, "./scripts/seed.ts"),
            key: "seed",
        },
        {
            scriptPath: path.resolve(dirname, "./scripts/seed-homepage-data.ts"),
            key: "seed-homepage-data",
        },
        {
            scriptPath: path.resolve(dirname, "./scripts/seed-posts.ts"),
            key: "seed-posts",
        },
    ],
    collections: [Users, Media, HomeLinks, Posts],
    globals: [Settings],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || "",
    typescript: {
        outputFile: path.resolve(dirname, "payload-types.ts"),
    },
    db: sqliteAdapter({
        // Schema is managed through migrations; dev push conflicts with them
        push: false,
        client: {
            url: process.env.DATABASE_URL || "",
        },
    }),
    sharp,
    plugins: [
        cloudStoragePlugin({
            collections: {
                media: {
                    adapter: cloudinaryAdapter,
                    disableLocalStorage: true,
                    // Store/return the Cloudinary URL directly instead of proxying through /api/media/file
                    disablePayloadAccessControl: true,
                },
            },
        }),
    ],
});
