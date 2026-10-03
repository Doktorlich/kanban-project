import { Task } from "@myapp/shared-types";

export function filterTasksByPriority(tasks: Task[], priorityId: number | null): Task[] {
    if (priorityId === null) return tasks;
    return tasks.filter(task => task.priority.id === priorityId);
}
