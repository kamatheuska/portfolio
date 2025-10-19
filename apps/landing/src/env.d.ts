// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
    PUBLIC_API_BASE_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
