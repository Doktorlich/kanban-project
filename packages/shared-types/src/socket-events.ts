export interface ServerToClientEvents {
    [SOCKET_EVENTS.TASKS_REORDERED]: (payload: TasksReorderedPayload) => void;
    [SOCKET_EVENTS.BOARD_CHANGED]: (payload: BoardChangedPayload) => void;
}
export interface ClientToServerEvents {
    [SOCKET_EVENTS.JOIN_BOARD]: (boardId: number, ack: (result: { ok: boolean }) => void) => void;
    [SOCKET_EVENTS.LEAVE_BOARD]: (boardId: number) => void;
}

export interface TasksReorderedPayload {
    boardId: number;
}
export interface BoardChangedPayload {
    boardId: number;
}

export const SOCKET_EVENTS = {
    JOIN_BOARD: "board:join",
    LEAVE_BOARD: "board:leave",
    TASKS_REORDERED: "tasks:reordered",
    BOARD_CHANGED: "board:changed",
} as const;
