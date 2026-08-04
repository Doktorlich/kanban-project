export interface Owner {
    id: number;
    owner: string;
}

// Новый интерфейс для карточки задачи
export interface TaskCard {
    id: number;
    title: string;
    description?: string; // Опционально, если описание есть не у всех задач
    // status: "todo" | "reviewed" | "completed"; // Пример статусов (можно изменить на string)
    status: string
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
                    // Наполнили массив карточками задач
                    { id: 111, title: "Learn TypeScript Basics", status: "done" },
                    { id: 112, title: "Setup Next.js Project", status: "in-progress" },
                    { id: 113, title: "Create Workspace Layout", status: "todo" },
                ],
            },
            {
                id: 12,
                nameBoard: "Home work",
                quantityTasks: 15,
                owners: [{ id: 11, owner: "JD" }],
                tasks: [], // Обязательный пустой массив, если задач пока нет
            },
            {
                id: 13,
                nameBoard: "Report work",
                quantityTasks: 1,
                owners: [{ id: 12, owner: "MK" }],
                tasks: [], // Обязательный пустой массив
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

