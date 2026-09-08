import { z } from "zod";

const baseTaskSchema = z.object({
    title: z.string().trim().min(5).max(255),
    description: z.string().trim().optional(),
    position: z.number().int("Position must be an integer").nonnegative("Position must be 0 or greater"),
    priorityId: z.number().int().positive(),
});

export const createTaskSchema = baseTaskSchema;
export const updateTaskSchema = baseTaskSchema.partial();
