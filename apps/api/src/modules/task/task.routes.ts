import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { requireRole } from "../../middleware/rbac.middleware";
import * as taskController from "./task.controller";
import { taskSchema } from "@myapp/shared-types";
import { validate } from "../../middleware/validate.middleware";

export const taskRouter = Router({ mergeParams: true });
export const taskDetailRouter = Router({ mergeParams: true });

taskRouter.post(
    "/",
    requireAuth,
    requireRole("board", ["owner", "member"]),
    validate(taskSchema.createTaskSchema),
    taskController.create,
);
taskRouter.get("/", requireAuth, requireRole("board", ["owner", "member"]), taskController.getAll);

taskDetailRouter.get("/:taskId", requireAuth, requireRole("board", ["owner", "member"]), taskController.getOne);
taskDetailRouter.patch(
    "/:taskId",
    requireAuth,
    requireRole("board", ["owner", "member"]),
    validate(taskSchema.updateTaskSchema),
    taskController.update,
);
taskDetailRouter.delete("/:taskId", requireAuth, requireRole("board", ["owner"]), taskController.remove);
