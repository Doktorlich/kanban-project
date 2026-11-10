import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware";
import { requireRole } from "../../middleware/rbac.middleware";
import { uploadSingleFile } from "../../lib/upload";
import * as attachmentController from "./attachment.controller";

export const attachmentRouter = Router({ mergeParams: true });

attachmentRouter.get("/", requireAuth, requireRole("board", ["owner", "member"]), attachmentController.getAll);

attachmentRouter.post(
    "/",
    requireAuth,
    requireRole("board", ["owner", "member"]),
    uploadSingleFile,
    attachmentController.upload,
);

attachmentRouter.get(
    "/:attachmentId/download",
    requireAuth,
    requireRole("board", ["owner", "member"]),
    attachmentController.download,
);

attachmentRouter.delete(
    "/:attachmentId",
    requireAuth,
    requireRole("board", ["owner", "member"]),
    attachmentController.remove,
);
