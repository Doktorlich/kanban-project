import type { Request, Response } from "express";
import * as taskService from "./task.service";

export async function create(req: Request, res: Response) {
    const { columnId } = req.params;
    const creatorId = req.userId;

    if (!creatorId) {
        res.status(401).json({ message: "Not authenticated" });
        return;
    }
    try {
        const task = await taskService.createTask(Number(columnId), Number(creatorId), req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}

export async function getAll(req: Request, res: Response) {
    const { columnId } = req.params;
    try {
        const tasks = await taskService.getTasks(Number(columnId));
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}

export async function getOne(req: Request, res: Response) {
    const { boardId, taskId } = req.params;
    try {
        const task = await taskService.getTaskById(Number(boardId), Number(taskId));
        res.status(200).json(task);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
}

export async function update(req: Request, res: Response) {
    const { boardId, taskId } = req.params;
    try {
        const task = await taskService.updateTask(Number(boardId), Number(taskId), req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}

export async function remove(req: Request, res: Response) {
    const { boardId, taskId } = req.params;
    try {
        await taskService.deleteTask(Number(boardId), Number(taskId));
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}
