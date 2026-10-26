import { Owner } from "./task";

export interface TaskComment {
    id: number;
    text: string;
    createdAt: string;
    updatedAt: string;
    isAuthor: boolean;
    user: Owner;
}
