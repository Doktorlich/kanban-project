import type { Request, Response } from "express";
import * as workspaceService from "./workspace.service";

export async function create(req: Request, res: Response) {
    try {
        const workspace = await workspaceService.createWorkspace(req.userId!, req.body);
        res.status(201).json(workspace);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}

export async function getAll(req: Request, res: Response) {
    try {
        const workspaces = await workspaceService.getUserWorkspaces(req.userId!);
        res.status(200).json(workspaces);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export async function getOne(req: Request, res: Response) {
    const { workspaceId } = req.params;
    try {
        const workspace = await workspaceService.getWorkspaceById(Number(workspaceId));
        res.status(200).json(workspace);
    } catch (error) {
        res.status(404).json({ message: (error as Error).message });
    }
}

export async function update(req: Request, res: Response) {
    const { workspaceId } = req.params;
    try {
        const updatedWorkspace = await workspaceService.updateWorkspace(Number(workspaceId), req.body);
        res.status(200).json(updatedWorkspace);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}

export async function remove(req: Request, res: Response) {
    const { workspaceId } = req.params;
    try {
        await workspaceService.deleteWorkspace(Number(workspaceId));
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}
