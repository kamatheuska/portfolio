import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/users";
import { Media } from "./collections/media";
import { Settings } from "./globals/settings";
import { HomeLinks } from "./collections/home-links";

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
    ],
    collections: [Users, Media, HomeLinks],
    globals: [Settings],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || "",
    typescript: {
        outputFile: path.resolve(dirname, "payload-types.ts"),
    },
    db: sqliteAdapter({
        client: {
            url: process.env.DATABASE_URL || "",
        },
    }),
    sharp,
    plugins: [],
});
