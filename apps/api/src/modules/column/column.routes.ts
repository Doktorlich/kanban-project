import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { requireRole } from "../../middleware/rbac.middleware";
import * as columnController from "./column.controller";

export const columnRouter = Router({ mergeParams: true });

columnRouter.post("/", requireAuth, requireRole("board", ["owner", "member"]), columnController.create);
columnRouter.get("/", requireAuth, requireRole("board", ["owner", "member"]), columnController.getAll);
columnRouter.get("/:columnId", requireAuth, requireRole("board", ["owner", "member"]), columnController.getOne);
columnRouter.patch("/:columnId", requireAuth, requireRole("board", ["owner", "member"]), columnController.update);
columnRouter.delete("/:columnId", requireAuth, requireRole("board", ["owner"]), columnController.remove);
