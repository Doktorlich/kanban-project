import { z } from "zod";

const baseColumnSchema = z.object({
    title: z.string().trim().min(2, "Min 2 symbols").max(70, "Max 70 symbols"),
    position: z.number().int("Position must be an integer").nonnegative("Position must be 0 or greater"),
});

export const createColumnSchema = baseColumnSchema;

export const updateColumnSchema = baseColumnSchema.partial();
