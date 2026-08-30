import type { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma";

type ResourceType = "workspace" | "board";

async function resolveWorkspaceId(resourceType: ResourceType, resourceId: number) {
    if (resourceType === "workspace") {
        return resourceId;
    }
    const board = await prisma.board.findUnique({
        where: {
            id: resourceId,
        },
        select: {
            workspaceId: true,
        },
    });
    return board?.workspaceId ?? null;
}

export function requireRole(resourceType: ResourceType, allowedRoles: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ message: "Not authenticated" });
            return;
        }

        const resourceIdParam = resourceType === "workspace" ? req.params.workspaceId : req.params.boardId;
        const resourceId = Number(resourceIdParam);
        if (!resourceIdParam || Number.isNaN(resourceId)) {
            res.status(400).json({ message: `Invalid ${resourceType} id` });
            return;
        }

        const workspaceId = await resolveWorkspaceId(resourceType, resourceId);
        if (!workspaceId) {
            res.status(404).json({ message: "Resource not found" });
            return;
        }

        const member = await prisma.workspaceMember.findFirst({
            where: {
                workspaceId,
                userId,
            },
        });

        if (!member) {
            res.status(403).json({ message: "You are not a member of this workspace" });
            return;
        }

        if (!allowedRoles.includes(member.role)) {
            res.status(403).json({ message: "Insufficient permissions" });
            return;
        }
        next();
    };
}
