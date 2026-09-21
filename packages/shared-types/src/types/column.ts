import { Task } from "./task";

export interface Column {
    id: number;
    title: string;
    position: number;
}

export interface ColumnWithTasks extends Column {
    tasks: Task[];
}
