import path from "node:path";
import fs from "node:fs";
import { randomUUID } from "node:crypto";
import multer from "multer";
import type { NextFunction, Request, Response } from "express";
import { ALLOWED_ATTACHMENT_TYPES, MAX_ATTACHMENT_SIZE_BYTES } from "@myapp/shared-types";

export const UPLOAD_DIR = path.resolve(process.cwd(), "uploads");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Расширение по mime-типу. Для неразрешённого типа вернёт undefined.
function getExtensionByMime(mime: string): string | undefined {
    if (!Object.prototype.hasOwnProperty.call(ALLOWED_ATTACHMENT_TYPES, mime)) return undefined;
    return ALLOWED_ATTACHMENT_TYPES[mime as keyof typeof ALLOWED_ATTACHMENT_TYPES];
}

// Своя ошибка, чтобы отличать "неверный тип" от остальных ошибок загрузки.
export class FileTypeError extends Error {
    constructor() {
        super("File type is not allowed");
        this.name = "FileTypeError";
    }
}

const upload = multer({
    storage: multer.diskStorage({
        destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
        filename: (_req, file, cb) => {
            const extension = getExtensionByMime(file.mimetype) ?? "bin";
            cb(null, `${randomUUID()}.${extension}`);
        },
    }),
    limits: { fileSize: MAX_ATTACHMENT_SIZE_BYTES },
    fileFilter: (_req, file, cb) => {
        if (getExtensionByMime(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new FileTypeError());
        }
    },
});

// Middleware для роута: принимает один файл из поля "file" и отвечает JSON-ошибками.
export function uploadSingleFile(req: Request, res: Response, next: NextFunction) {
    upload.single("file")(req, res, (error?: unknown) => {
        if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
            res.status(413).json({
                message: `File is too large (max ${MAX_ATTACHMENT_SIZE_BYTES / 1024 / 1024} MB)`,
            });
            return;
        }
        if (error instanceof FileTypeError) {
            res.status(400).json({ message: error.message });
            return;
        }
        if (error) {
            res.status(400).json({ message: "Upload failed" });
            return;
        }
        if (!req.file) {
            res.status(400).json({ message: "File is required" });
            return;
        }
        next();
    });
}

// Полный путь к файлу на диске по его имени из базы (поле fileUrl).
export function getUploadPath(storedName: string): string {
    return path.join(UPLOAD_DIR, storedName);
}

// Удаление файла с диска. Ошибки не пробрасываем: неудавшаяся чистка не должна ломать запрос.
export async function removeUploadedFile(storedName: string): Promise<void> {
    try {
        await fs.promises.unlink(getUploadPath(storedName));
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
            console.error("Failed to remove uploaded file", error);
        }
    }
}
