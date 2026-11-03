import { z } from "zod";

const textSchema = z.string().trim().min(1, "Comment can't be empty").max(2000, "Comment can't be more than 2000");

export const createCommentSchema = z.object({
    text: textSchema,
});

export const updateCommentSchema = z.object({
    text: textSchema,
});
