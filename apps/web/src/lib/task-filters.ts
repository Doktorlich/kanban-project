import { Task } from "@myapp/shared-types";
import { SortOption } from "@/store/boardFilters.slice";

export function filterTasksByPriority(tasks: Task[], priorityId: number | null): Task[] {
    if (priorityId === null) return tasks;
    return tasks.filter(task => task.priority.id === priorityId);
}
export function sortTasksByUpdatedAt(tasks: Task[], sortBy: SortOption): Task[] {
    if (sortBy === null) return tasks;
    const sorted = [...tasks];
    sorted.sort((a, b) => {
        const diff = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        return sortBy === "updatedAt-asc" ? diff : -diff;
    });
    return sorted;
}

export function filterTasksBySearch(tasks: Task[], searchQuery: string): Task[] {
    const query = searchQuery.trim().toLowerCase();
    if (query === "") return tasks;

    return tasks.filter(task => {
        const titleMatch = task.title.toLowerCase().includes(query);
        const descriptionMatch = task.description?.toLowerCase().includes(query) ?? false;
        return titleMatch || descriptionMatch;
    });
}
