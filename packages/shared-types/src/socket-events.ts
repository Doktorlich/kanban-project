export interface ServerToClientEvents {
    [SOCKET_EVENTS.TASKS_REORDERED]: (payload: TasksReorderedPayload) => void;
}
export interface ClientToServerEvents {
    [SOCKET_EVENTS.JOIN_BOARD]: (boardId: number, ack: (result: { ok: boolean }) => void) => void;
    [SOCKET_EVENTS.LEAVE_BOARD]: (boardId: number) => void;
}
export interface TasksReorderedPayload {
    boardId: number;
}
export const SOCKET_EVENTS = {
    JOIN_BOARD: "board:join",
    LEAVE_BOARD: "board:leave",
    TASKS_REORDERED: "tasks:reordered",
} as const;
