import { z } from "zod";

const textSchema = z.string().trim().min(1).max(2000);

export const createCommentSchema = z.object({
    text: textSchema,
});

export const updateCommentSchema = z.object({
    text: textSchema,
});
