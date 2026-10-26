import { z } from "zod";
import { commentSchema } from "@myapp/shared-types";

export type CreateCommentDto = z.infer<typeof commentSchema.createCommentSchema>;
export type UpdateCommentDto = z.infer<typeof commentSchema.updateCommentSchema>;
