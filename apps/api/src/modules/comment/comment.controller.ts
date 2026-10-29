import type { Request, Response } from "express";
import * as commentService from "./comment.service";
import { emitBoardChanged } from "../../socket/emit";
export async function create(req: Request, res: Response) {
    const { boardId, taskId } = req.params;
    const creatorId = req.userId;
    if (!creatorId) {
        res.status(401).json({ message: "Not authenticated" });
        return;
    }
    try {
        const comment = await commentService.createComment(Number(boardId), Number(taskId), creatorId, req.body);
        emitBoardChanged(Number(boardId), req.header("x-socket-id"));
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}
export async function getAll(req: Request, res: Response) {
    const { boardId, taskId } = req.params;

    const userId = req.userId;
    if (!userId) {
        res.status(401).json({ message: "Not authenticated" });
        return;
    }
    try {
        const comments = await commentService.getComments(Number(boardId), Number(taskId), userId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}
export async function update(req: Request, res: Response) {
    const { boardId, taskId, commentId } = req.params;
    const userId = req.userId;
    if (!userId) {
        res.status(401).json({ message: "Not authenticated" });
        return;
    }
    try {
        const comment = await commentService.updateComment(
            Number(boardId),
            Number(taskId),
            Number(commentId),
            userId,
            req.body,
        );
        emitBoardChanged(Number(boardId), req.header("x-socket-id"));
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}
export async function remove(req: Request, res: Response) {
    const { boardId, taskId, commentId } = req.params;

    const userId = req.userId;
    if (!userId) {
        res.status(401).json({ message: "Not authenticated" });
        return;
    }
    try {
        await commentService.deleteComment(Number(boardId), Number(taskId), Number(commentId), userId);
        emitBoardChanged(Number(boardId), req.header("x-socket-id"));
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}
