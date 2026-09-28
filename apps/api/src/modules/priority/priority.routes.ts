import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { prisma } from "../../prisma";

export const priorityRouter = Router();

priorityRouter.get("/", requireAuth, async (req, res) => {
    try {
        const priorities = await prisma.priority.findMany({ orderBy: { weight: "asc" } });
        res.status(200).json(priorities);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
});
