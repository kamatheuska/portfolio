import type { Adapter, GeneratedAdapter } from "@payloadcms/plugin-cloud-storage/types";
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

// Cloudinary folder all Payload uploads live under
const FOLDER = "portfolio/media";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

// Payload keeps the filename (with extension) as the doc's identity; Cloudinary
// public_ids are extension-less. Upload, delete and URL generation must all
// derive the id the same way, so it lives in one place.
function publicId(filename: string) {
    return `${FOLDER}/${filename.replace(/\.[^/.]+$/, "")}`;
}

type CloudinaryError = { message?: string; http_code?: number; name?: string; error?: CloudinaryError };

// The SDK rejects with plain objects (sometimes nested under `error`), not Errors,
// so pino logs them with no stack and little context. Flatten them into fields.
function describeError(err: unknown) {
    const e = ((err as CloudinaryError)?.error ?? err) as CloudinaryError;
    return {
        name: e?.name ?? (err instanceof Error ? err.name : typeof err),
        message: e?.message ?? (err instanceof Error ? err.message : String(err)),
        httpCode: e?.http_code,
        raw: err,
    };
}

// Enough to spot a wrong cloud name or key without leaking the secret
function cloudinaryContext() {
    const key = process.env.CLOUDINARY_API_KEY;
    return {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "<missing>",
        apiKey: key ? `${key.slice(0, 4)}… (${key.length} chars)` : "<missing>",
        apiSecretSet: Boolean(process.env.CLOUDINARY_API_SECRET),
    };
}

function failureHint(httpCode: number | undefined) {
    switch (httpCode) {
        case 401:
            return "Credentials rejected: check CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET and that they belong to CLOUDINARY_CLOUD_NAME";
        case 403:
            return "Credentials accepted but action forbidden: check the API key's role/permissions and Settings > Security upload/IP restrictions";
        case 404:
            return "Cloud not found: check CLOUDINARY_CLOUD_NAME";
        case 420:
            return "Rate limited by Cloudinary";
        default:
            return undefined;
    }
}

function uploadBuffer(buffer: Buffer, id: string) {
    return new Promise<UploadApiResponse>(function (resolve, reject) {
        const stream = cloudinary.uploader.upload_stream(
            { public_id: id, resource_type: "auto", overwrite: false },
            function (error, result) {
                if (error) return reject(error);
                if (!result) return reject(new Error("No result returned from Cloudinary"));
                resolve(result);
            },
        );
        stream.end(buffer);
    });
}

export const cloudinaryAdapter: Adapter = function (): GeneratedAdapter {
    return {
        name: "cloudinary",

        async handleUpload({ file, req }) {
            const id = publicId(file.filename);
            try {
                const result = await uploadBuffer(file.buffer, id);
                req.payload.logger.info(
                    {
                        publicId: result.public_id,
                        bytes: result.bytes,
                        format: result.format,
                        url: result.secure_url,
                    },
                    "Cloudinary upload succeeded",
                );
            } catch (err) {
                const error = describeError(err);
                const hint = failureHint(error.httpCode);
                req.payload.logger.error(
                    {
                        operation: "upload",
                        publicId: id,
                        filename: file.filename,
                        mimeType: file.mimeType,
                        filesize: file.filesize,
                        cloudinary: cloudinaryContext(),
                        error,
                        hint,
                    },
                    `Cloudinary upload failed${error.httpCode ? ` (HTTP ${error.httpCode})` : ""}: ${error.message}`,
                );
                // Rethrow a real Error so Payload rejects the upload instead of saving a doc with no file
                throw new Error(`Cloudinary upload failed: ${error.message}${hint ? `. ${hint}` : ""}`, {
                    cause: err,
                });
            }
        },

        async handleDelete({ filename, req }) {
            const id = publicId(filename);
            try {
                // destroy resolves with { result: "not found" } instead of rejecting for missing assets
                const { result } = (await cloudinary.uploader.destroy(id)) as { result?: string };
                if (result !== "ok") {
                    req.payload.logger.warn(
                        { publicId: id, filename, result },
                        "Cloudinary delete did not remove an asset",
                    );
                }
            } catch (err) {
                const error = describeError(err);
                // Don't block deleting the doc over a missing/remote-deleted asset
                req.payload.logger.error(
                    {
                        operation: "delete",
                        publicId: id,
                        filename,
                        cloudinary: cloudinaryContext(),
                        error,
                        hint: failureHint(error.httpCode),
                    },
                    `Cloudinary delete failed${error.httpCode ? ` (HTTP ${error.httpCode})` : ""}: ${error.message}`,
                );
            }
        },

        generateURL({ filename }) {
            return cloudinary.url(publicId(filename), { secure: true });
        },

        // Files are served straight from Cloudinary, never through /api/media/file/*
        staticHandler() {
            return new Response("Not found", { status: 404 });
        },
    };
};
