import type { Request, Response } from "express";
import * as attachmentService from "./attachment.service";
import { emitBoardChanged } from "../../socket/emit";

export async function getAll(req: Request, res: Response) {
    const { boardId, taskId } = req.params;
    try {
        const attachments = await attachmentService.getAttachments(Number(boardId), Number(taskId));
        res.status(200).json(attachments);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}

export async function download(req: Request, res: Response) {
    const { boardId, taskId, attachmentId } = req.params;
    try {
        const { filePath, fileName, isImage } = await attachmentService.getAttachmentFile(
            Number(boardId),
            Number(taskId),
            Number(attachmentId),
        );

        // Запрещаем браузеру "угадывать" тип содержимого по самому файлу.
        res.setHeader("X-Content-Type-Options", "nosniff");

        // Ошибка чтения файла (например, его нет на диске) приходит сюда.
        const onFileError = (error: Error | null) => {
            if (error && !res.headersSent) {
                res.status(404).json({ message: "File not found" });
            }
        };

        if (isImage) {
            res.sendFile(filePath, onFileError); // открывается прямо в <img>
        } else {
            res.download(filePath, fileName, onFileError); // скачивается с оригинальным именем
        }
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
}

export async function upload(req: Request, res: Response) {
    const { boardId, taskId } = req.params;
    // Файл кладёт в req.file middleware uploadSingleFile, но TS этого не знает, поэтому проверяем.
    const file = req.file;
    if (!file) {
        res.status(400).json({ message: "File is required" });
        return;
    }
    try {
        const attachment = await attachmentService.createAttachment(Number(boardId), Number(taskId), file);
        emitBoardChanged(Number(boardId), req.header("x-socket-id"));
        res.status(201).json(attachment);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}

export async function remove(req: Request, res: Response) {
    const { boardId, taskId, attachmentId } = req.params;
    try {
        await attachmentService.deleteAttachment(Number(boardId), Number(taskId), Number(attachmentId));
        emitBoardChanged(Number(boardId), req.header("x-socket-id"));
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}
