import { taskSchema } from "@myapp/shared-types";
import { z } from "zod";

export interface CreateTaskDto {
    title: string;
    description?: string;
    priorityId: number;
}
export interface UpdateTaskDto {
    title?: string;
    description?: string;
    position?: number;
    priorityId?: number;
}
export type ReorderTasksDto = z.infer<typeof taskSchema.reorderTasksSchema>;
