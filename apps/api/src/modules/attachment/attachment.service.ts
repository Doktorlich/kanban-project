import path from "node:path";
import fs from "node:fs";
import type { TaskAttachment } from "@myapp/shared-types";
import { prisma } from "../../prisma";
import { getUploadPath, removeUploadedFile } from "../../lib/upload";
import { UPLOAD_DIR } from "../../lib/upload";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".webp", ".gif"]);
type AttachmentRow = { id: number; fileName: string; fileUrl: string; fileSize: number; createdAt: Date };

function isImageFile(storedName: string): boolean {
    return IMAGE_EXTENSIONS.has(path.extname(storedName).toLowerCase());
}

function toTaskAttachment(row: AttachmentRow): TaskAttachment {
    return {
        id: row.id,
        fileName: row.fileName,
        fileSize: row.fileSize,
        createdAt: row.createdAt.toISOString(),
        isImage: isImageFile(row.fileUrl),
    };
}

function decodeFileName(name: string): string {
    if ([...name].some(char => char.charCodeAt(0) > 255)) return name;
    const decoded = Buffer.from(name, "latin1").toString("utf8");
    return decoded.includes("\uFFFD") ? name : decoded;
}

export async function getAttachments(boardId: number, taskId: number): Promise<TaskAttachment[]> {
    const attachments = await prisma.attachment.findMany({
        where: { taskId, task: { column: { boardId } } },
        orderBy: { createdAt: "asc" },
    });
    return attachments.map(toTaskAttachment);
}

export async function createAttachment(
    boardId: number,
    taskId: number,
    file: Express.Multer.File,
): Promise<TaskAttachment> {
    try {
        const task = await prisma.task.findFirst({
            where: { id: taskId, column: { boardId } },
            select: { id: true },
        });
        if (!task) throw new Error("Task not found");

        const attachment = await prisma.attachment.create({
            data: {
                taskId,
                fileName: decodeFileName(file.originalname),
                fileUrl: file.filename,
                fileSize: file.size,
            },
        });
        return toTaskAttachment(attachment);
    } catch (error) {
        // К этому моменту multer уже записал файл на диск, поэтому при любой ошибке его нужно удалить.
        await removeUploadedFile(file.filename);
        throw error;
    }
}

export async function getAttachmentFile(boardId: number, taskId: number, attachmentId: number) {
    const attachment = await prisma.attachment.findFirst({
        where: { id: attachmentId, taskId, task: { column: { boardId } } },
    });
    if (!attachment) throw new Error("Attachment not found");

    return {
        filePath: getUploadPath(attachment.fileUrl),
        fileName: attachment.fileName,
        isImage: isImageFile(attachment.fileUrl),
    };
}
export async function deleteAttachment(boardId: number, taskId: number, attachmentId: number): Promise<void> {
    const existing = await prisma.attachment.findFirst({
        where: { id: attachmentId, taskId, task: { column: { boardId } } },
        select: { id: true, fileUrl: true },
    });
    if (!existing) throw new Error("Attachment not found");

    await prisma.attachment.delete({ where: { id: attachmentId } });
    await removeUploadedFile(existing.fileUrl);
}
// Удаляет файлы из папки uploads, на которые не ссылается ни одна запись Attachment.
export async function removeOrphanUploads(): Promise<void> {
    const [filesOnDisk, rows] = await Promise.all([
        fs.promises.readdir(UPLOAD_DIR),
        prisma.attachment.findMany({ select: { fileUrl: true } }),
    ]);

    const knownFiles = new Set(rows.map(row => row.fileUrl));
    const orphans = filesOnDisk.filter(name => !knownFiles.has(name));

    await Promise.all(orphans.map(name => removeUploadedFile(name)));
}
