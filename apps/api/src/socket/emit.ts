import { SOCKET_EVENTS } from "@myapp/shared-types";
import { getIo } from "./index";
import { boardRoom } from "./rooms";

export function emitTasksReordered(boardId: number, exceptSocketId?: string) {
    const room = getIo().to(boardRoom(boardId));
    const target = exceptSocketId ? room.except(exceptSocketId) : room;
    target.emit(SOCKET_EVENTS.TASKS_REORDERED, { boardId });
}

export function emitBoardChanged(boardId: number, exceptSocketId?: string) {
    try {
        const room = getIo().to(boardRoom(boardId));
        const target = exceptSocketId ? room.except(exceptSocketId) : room;
        target.emit(SOCKET_EVENTS.BOARD_CHANGED, { boardId });
    } catch (error) {
        console.error("Failed to emit board:changed", error);
    }
}
