export interface ServerToClientEvents {}
export interface ClientToServerEvents {}

export const SOCKET_EVENTS = {
    JOIN_BOARD: "board:join",
    LEAVE_BOARD: "board:leave",
    TASKS_REORDERED: "tasks:reordered",
} as const;
