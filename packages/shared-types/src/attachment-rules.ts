export const MAX_ATTACHMENT_SIZE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_ATTACHMENT_TYPES = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
    "image/gif": "gif",
    "application/pdf": "pdf",
    "text/plain": "txt",
    "application/zip": "zip",
    "application/x-zip-compressed": "zip",
} as const;
