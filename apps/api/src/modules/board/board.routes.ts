import { Router } from "express";
import * as boardController from "./board.controller";
import { requireAuth } from "../../middleware/auth.middleware";
import { requireRole } from "../../middleware/rbac.middleware";

export const boardRouter = Router({ mergeParams: true });

boardRouter.post("/", requireAuth, requireRole("workspace", ["owner", "member"]), boardController.create);
boardRouter.get("/", requireAuth, requireRole("workspace", ["owner", "member"]), boardController.getAll);
boardRouter.get("/:boardId", requireAuth, requireRole("board", ["owner", "member"]), boardController.getOne);
boardRouter.patch("/:boardId", requireAuth, requireRole("board", ["owner", "member"]), boardController.update);
boardRouter.delete("/:boardId", requireAuth, requireRole("board", ["owner"]), boardController.remove);
