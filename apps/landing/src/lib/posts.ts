import { ADMIN_BASE_URL } from "astro:env/server";

import { adminFetchJson } from "./admin-client";
import type { LexicalState } from "./lexical-to-html";

export interface Media {
    id: number;
    alt: string;
    url?: string | null;
    width?: number | null;
    height?: number | null;
}

export interface Post {
    id: number;
    title: string;
    slug: string;
    heroImage: number | Media;
    excerpt?: string | null;
    body: LexicalState;
    metaTitle?: string | null;
    metaDescription?: string | null;
    ogImage?: number | Media | null;
    canonicalUrl?: string | null;
    publishedAt?: string | null;
    tags?: string[] | null;
}

interface PostsResponse {
    docs: Post[];
}

// depth=1 populates heroImage/ogImage as Media objects
const PUBLISHED_POSTS_PATH =
    "/api/posts?where[_status][equals]=published&depth=1&limit=0&sort=-publishedAt";

export async function getPublishedPosts() {
    const data = await adminFetchJson<PostsResponse>(PUBLISHED_POSTS_PATH);
    return data.docs;
}

// Media urls are absolute Cloudinary urls; resolving against the admin base
// is kept for any relative url (new URL leaves absolute ones untouched)
export function mediaUrl(media: number | Media | null | undefined) {
    if (!media || typeof media === "number" || !media.url) return undefined;
    return new URL(media.url, ADMIN_BASE_URL).toString();
}
