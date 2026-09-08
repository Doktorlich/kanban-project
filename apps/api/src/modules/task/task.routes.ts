import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { requireRole } from "../../middleware/rbac.middleware";
import * as taskController from "./task.controller";
import * as taskSchema from "./task.schema";
import { validate } from "../../middleware/validate.middleware";

export const taskRouter = Router({ mergeParams: true });

taskRouter.post(
    "/",
    requireAuth,
    requireRole("board", ["owner", "member"]),
    validate(taskSchema.createTaskSchema),
    taskController.create,
);
taskRouter.get("/", requireAuth, requireRole("board", ["owner", "member"]), taskController.getAll);
taskRouter.get("/:taskId", requireAuth, requireRole("board", ["owner", "member"]), taskController.getOne);
taskRouter.patch(
    "/:taskId",
    requireAuth,
    requireRole("board", ["owner", "member"]),
    validate(taskSchema.updateTaskSchema),
    taskController.update,
);
taskRouter.delete("/:taskId", requireAuth, requireRole("board", ["owner"]), taskController.remove);
