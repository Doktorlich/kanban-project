import { z } from "zod";

const baseTaskSchema = z.object({
    title: z.string().trim().min(5, "Min 5 symbols").max(255, "Max 255 symbols"),
    description: z.string().trim().optional(),
    priorityId: z.number().int("Priority must be an integer").positive("Priority must be a positive number"),
});

export const createTaskSchema = baseTaskSchema;

export const updateTaskSchema = baseTaskSchema
    .extend({
        position: z.number().int("Position must be an integer").nonnegative("Position must be 0 or greater"),
    })
    .partial();
