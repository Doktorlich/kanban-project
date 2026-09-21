export interface Owner {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
}
export interface Priority {
    id: number;
    name: string;
    color: string;
    weight: number;
}

export interface Task {
    id: number;
    title: string;
    description: string | null;
    position: number;
    columnId: number;
    priority: Priority;
    createdAt: string;
    updatedAt: string;
    owners: Owner[];
}
