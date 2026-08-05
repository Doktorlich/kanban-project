export interface Owner {
    id: number;
    owner: string;
}
export interface CommentsTask {
    id: number;
    image: string;
    fullName: string;
    comment: string;
}
// Новый интерфейс для карточки задачи
export interface TaskCard {
    id: number;
    title: string;
    description?: string; // Опционально, если описание есть не у всех задач
    status: "todo" | "reviewed" | "in-progress" | "done"; // Пример статусов (можно изменить на string)
    dateUpdate: string;
    dateCreated: string;
    owners: Owner[];
    commentsUser: CommentsTask[];
}

interface ColumnsBoard {
    id: TaskCard["status"];
    title: string;
}

export interface Board {
    id: number;
    nameBoard: string;
    quantityTasks: number;
    owners: Owner[];

    tasks: TaskCard[]; // Добавляем обязательный массив задач в каждую доску
}

export interface Workspace {
    id: number;
    image: string;
    nameWorkspace: string;
    quantityBoards: number;
    boards: Board[];
    owners: Owner[];
}

export const COLUMNS: ColumnsBoard[] = [
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "reviewed", title: "Reviewed" },
    { id: "done", title: "Done" },
];

export const WORKSPACES: Workspace[] = [
    {
        id: 1,
        image: "w",
        nameWorkspace: "Work",
        quantityBoards: 3,
        boards: [
            {
                id: 11,
                nameBoard: "Education programming",
                quantityTasks: 3,
                owners: [
                    { id: 11, owner: "JD" },
                    { id: 12, owner: "MK" },
                ],
                tasks: [
                    {
                        id: 111,
                        title: "Learn TypeScript Basics",
                        status: "done",
                        dateUpdate: "17.06.2026",
                        dateCreated: "17.06.2026",
                        description: "Loren ipsum description 111",
                        commentsUser: [
                            {
                                id: 1111,
                                image: "IMAGE John",
                                fullName: "John Doe",
                                comment: "Great progress on this task! Let's move to Next.js next.",
                            },
                            {
                                id: 1112,
                                image: "IMAGE Mary",
                                fullName: "Mary King",
                                comment: "I reviewed the types file. Everything looks super clean!",
                            },
                        ],
                        owners: [{ id: 11, owner: "JD" }],
                    },
                    {
                        id: 112,
                        title: "Learn TypeScript Types",
                        status: "done",
                        dateUpdate: "17.06.2026",
                        dateCreated: "17.06.2026",
                        description: "Loren ipsum description 112",
                        commentsUser: [],
                        owners: [
                            { id: 11, owner: "JD" },
                            { id: 12, owner: "MK" },
                        ],
                    },
                    {
                        id: 113,
                        title: "Setup Next.js Project",
                        status: "in-progress",
                        dateUpdate: "17.06.2026",
                        dateCreated: "17.06.2026",
                        commentsUser: [],
                        owners: [{ id: 12, owner: "MK" }],
                    },
                    {
                        id: 114,
                        title: "Create Workspace Layout",
                        status: "todo",
                        dateUpdate: "17.06.2026",
                        dateCreated: "17.06.2026",
                        description: "Loren ipsum description 114",
                        commentsUser: [],
                        owners: [],
                    },
                ],
            },
            {
                id: 12,
                nameBoard: "Home work",
                quantityTasks: 15,
                owners: [{ id: 11, owner: "JD" }],
                tasks: [],
            },
            {
                id: 13,
                nameBoard: "Report work",
                quantityTasks: 1,
                owners: [{ id: 12, owner: "MK" }],
                tasks: [],
            },
        ],
        owners: [
            { id: 11, owner: "JD" },
            { id: 12, owner: "MK" },
        ],
    },
    {
        id: 2,
        image: "L",
        nameWorkspace: "My projects",
        quantityBoards: 2,
        boards: [],
        owners: [{ id: 21, owner: "JD" }],
    },
];
