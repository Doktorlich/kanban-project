export interface Task {
    id: number;
    title: string;
    description: string | null;
    position: number;
    columnId: number;
    priorityId: number;
    createdAt: string;
    updatedAt: string;
}
