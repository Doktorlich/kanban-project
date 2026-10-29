import type { Request, Response } from "express";
import * as commentService from "./comment.service";

export async function create(req: Request, res: Response) {
    const { boardId, taskId } = req.params;

    const creatorId = req.userId;
    if (!creatorId) {
        res.status(401).json({ message: "Not authenticated" });
        return;
    }

    try {
        const comment = await commentService.createComment(Number(boardId), Number(taskId), creatorId, req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}
export async function getAll(req: Request, res: Response) {
    const { boardId, taskId } = req.params;

    const isUser = req.userId;
    if (!isUser) {
        res.status(401).json({ message: "Not authenticated" });
        return;
    }
    try {
        const comments = await commentService.getComments(Number(boardId), Number(taskId), isUser);
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}
export async function update(req: Request, res: Response) {
    const { boardId, taskId, commentId } = req.params;
    const isUser = req.userId;
    if (!isUser) {
        res.status(401).json({ message: "Not authenticated" });
        return;
    }
    try {
        const comment = await commentService.updateComment(
            Number(boardId),
            Number(taskId),
            Number(commentId),
            isUser,
            req.body,
        );
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}
export async function remove(req: Request, res: Response) {
    const { boardId, taskId, commentId } = req.params;

    const isUser = req.userId;
    if (!isUser) {
        res.status(401).json({ message: "Not authenticated" });
        return;
    }
    try {
        await commentService.deleteComment(Number(boardId), Number(taskId), Number(commentId), isUser);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}
