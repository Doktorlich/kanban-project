import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { requireRole } from "../../middleware/rbac.middleware";
import * as taskController from "./task.controller";

export const taskRouter = Router({ mergeParams: true });

taskRouter.post("/", requireAuth, requireRole("board", ["owner", "member"]), taskController.create);
taskRouter.get("/", requireAuth, requireRole("board", ["owner", "member"]), taskController.getAll);
taskRouter.get("/:taskId", requireAuth, requireRole("board", ["owner", "member"]), taskController.getOne);
taskRouter.patch("/:taskId", requireAuth, requireRole("board", ["owner", "member"]), taskController.update);
taskRouter.delete("/:taskId", requireAuth, requireRole("board", ["owner"]), taskController.remove);
