import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { requireRole } from "../../middleware/rbac.middleware";
import { validate } from "../../middleware/validate.middleware";
import * as workspaceController from "./workspace.controller";
import { workspaceSchema } from "./workspace.schema";

export const workspaceRouter = Router();

workspaceRouter.post("/", requireAuth, validate(workspaceSchema), workspaceController.create);
workspaceRouter.get("/", requireAuth, workspaceController.getAll);
workspaceRouter.get(
    "/:workspaceId",
    requireAuth,
    requireRole("workspace", ["owner", "member"]),
    workspaceController.getOne,
);
workspaceRouter.patch(
    "/:workspaceId",
    requireAuth,
    requireRole("workspace", ["owner", "member"]),
    validate(workspaceSchema),
    workspaceController.update,
);
workspaceRouter.delete("/:workspaceId", requireAuth, requireRole("workspace", ["owner"]), workspaceController.remove);
