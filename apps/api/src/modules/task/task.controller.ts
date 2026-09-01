import type { Request, Response } from "express";
import * as taskService from "./task.service";

export async function create(req: Request, res: Response) {
    const { columnId } = req.params;
    try {
        const task = await taskService.createTask(Number(columnId), req.body);
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
    const { boardId, columnId, taskId } = req.params;
    try {
        const task = await taskService.getTaskById(Number(boardId), Number(columnId), Number(taskId));
        res.status(200).json(task);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
}

export async function update(req: Request, res: Response) {
    const { boardId, columnId, taskId } = req.params;
    try {
        const task = await taskService.updateTask(Number(boardId), Number(columnId), Number(taskId), req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}

export async function remove(req: Request, res: Response) {
    const { boardId, columnId, taskId } = req.params;
    try {
        await taskService.deleteTask(Number(boardId), Number(columnId), Number(taskId));
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}
