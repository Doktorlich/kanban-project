import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { requireRole } from "../../middleware/rbac.middleware";
import * as commentController from "./comment.controller";
import { commentSchema } from "@myapp/shared-types";
import { validate } from "../../middleware/validate.middleware";

export const commentRouter = Router({ mergeParams: true });

commentRouter.post(
    "/",
    requireAuth,
    requireRole("board", ["owner", "member"]),
    validate(commentSchema.createCommentSchema),
    commentController.create,
);
commentRouter.get("/", requireAuth, requireRole("board", ["owner", "member"]), commentController.getAll);
commentRouter.patch(
    "/:commentId",
    requireAuth,
    requireRole("board", ["owner", "member"]),
    validate(commentSchema.updateCommentSchema),
    commentController.update,
);
commentRouter.delete("/:commentId", requireAuth, requireRole("board", ["owner", "member"]), commentController.remove);
