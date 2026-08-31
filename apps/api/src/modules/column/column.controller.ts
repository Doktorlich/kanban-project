import type { Request, Response } from "express";
import * as columnService from "./column.service";

export async function create(req: Request, res: Response) {
    const { boardId } = req.params;

    try {
        const column = await columnService.createColumn(Number(boardId), req.body);
        res.status(201).json(column);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}
export async function getOne(req: Request, res: Response) {
    const { columnId } = req.params;
    try {
        const column = await columnService.getColumnById(Number(columnId));
        res.status(200).json(column);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
}

export async function getAll(req: Request, res: Response) {
    const { boardId } = req.params;
    try {
        const columns = await columnService.getColumns(Number(boardId));
        res.status(200).json(columns);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export async function update(req: Request, res: Response) {
    const { columnId } = req.params;

    try {
        const column = await columnService.updateColumn(Number(columnId), req.body);
        res.status(200).json(column);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}
export async function remove(req: Request, res: Response) {
    const { columnId } = req.params;
    try {
        await columnService.deleteColumn(Number(columnId));
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}
