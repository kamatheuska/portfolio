import { mediaUrl, type Media } from "./posts";

export interface LexicalNode {
    type: string;
    children?: LexicalNode[];
    [key: string]: unknown;
}

export interface LexicalState {
    root: LexicalNode;
}

// Lexical text format bitmask -> wrapping tag
const TEXT_FORMATS: [number, string][] = [
    [1, "strong"],
    [2, "em"],
    [4, "s"],
    [8, "u"],
    [16, "code"],
    [32, "sub"],
    [64, "sup"],
];

const HEADING_TAGS = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function serializeChildren(node: LexicalNode) {
    return (node.children ?? []).map(serializeNode).join("");
}

function serializeText(node: LexicalNode) {
    const format = typeof node.format === "number" ? node.format : 0;
    let html = escapeHtml(String(node.text ?? ""));
    for (const [flag, tag] of TEXT_FORMATS) {
        if (format & flag) html = `<${tag}>${html}</${tag}>`;
    }
    return html;
}

function serializeLink(node: LexicalNode) {
    const fields = (node.fields ?? {}) as { url?: string; newTab?: boolean; linkType?: string };
    const href = fields.linkType === "internal" || !fields.url ? "#" : fields.url;
    const target = fields.newTab ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${escapeHtml(href)}"${target}>${serializeChildren(node)}</a>`;
}

function serializeUpload(node: LexicalNode) {
    const media = node.value as Media | number | undefined;
    const src = mediaUrl(media);
    if (!src || typeof media !== "object") return "";
    const size = media.width && media.height ? ` width="${media.width}" height="${media.height}"` : "";
    return `<img src="${escapeHtml(src)}" alt="${escapeHtml(media.alt ?? "")}"${size} loading="lazy" />`;
}

function serializeNode(node: LexicalNode): string {
    switch (node.type) {
        case "text":
            return serializeText(node);
        case "linebreak":
            return "<br />";
        case "tab":
            return "\t";
        case "paragraph":
            return `<p>${serializeChildren(node)}</p>`;
        case "heading": {
            const tag = HEADING_TAGS.has(String(node.tag)) ? String(node.tag) : "h2";
            return `<${tag}>${serializeChildren(node)}</${tag}>`;
        }
        case "list": {
            const tag = node.listType === "number" ? "ol" : "ul";
            return `<${tag}>${serializeChildren(node)}</${tag}>`;
        }
        case "listitem":
            return `<li>${serializeChildren(node)}</li>`;
        case "quote":
            return `<blockquote>${serializeChildren(node)}</blockquote>`;
        case "horizontalrule":
            return "<hr />";
        case "link":
        case "autolink":
            return serializeLink(node);
        case "upload":
            return serializeUpload(node);
        default:
            return serializeChildren(node);
    }
}

export function lexicalToHtml(state: LexicalState | null | undefined) {
    if (!state?.root) return "";
    return serializeChildren(state.root);
}
