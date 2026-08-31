import type { Request, Response } from "express";
import { createBoard, deleteBoard, getBoardById, getUserBoards, updateBoard } from "./board.service";

export async function create(req: Request, res: Response) {
    const { workspaceId } = req.params;
    try {
        const board = await createBoard(Number(workspaceId), req.body);
        res.status(201).json(board);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}

export async function getAll(req: Request, res: Response) {
    const { workspaceId } = req.params;
    const boards = await getUserBoards(Number(workspaceId), req.userId!);
    res.status(200).json(boards);
}

export async function getOne(req: Request, res: Response) {
    const { boardId } = req.params;
    try {
        const board = await getBoardById(Number(boardId));
        res.status(200).json(board);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
}
export async function update(req: Request, res: Response) {
    const { boardId } = req.params;
    try {
        const board = await updateBoard(Number(boardId), req.body);
        res.status(200).json(board);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}
export async function remove(req: Request, res: Response) {
    const { boardId } = req.params;
    try {
        await deleteBoard(Number(boardId));
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}
