import { z } from "zod";

const titleSchema = z.string().trim().min(2, "Min 2 symbols").max(70, "Max 70 symbols");

export const createColumnSchema = z.object({
    title: titleSchema,
});

export const updateColumnSchema = z.object({
    title: titleSchema.optional(),
    position: z.number().int("Position must be an integer").nonnegative("Position must be 0 or greater").optional(),
});
