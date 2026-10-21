import { SOCKET_EVENTS } from "@myapp/shared-types";
import { boardRoom } from "./rooms";
import type { AppSocket } from "./types";
import { isBoardMember } from "./board-access";

export function registerBoardHandlers(socket: AppSocket) {
    socket.on(SOCKET_EVENTS.JOIN_BOARD, async (boardId, ack) => {
        // типы TS в рантайме не работают: клиент может прислать что угодно
        if (typeof ack !== "function") return;
        try {
            if (!Number.isInteger(boardId) || !(await isBoardMember(socket.data.userId, boardId))) {
                return ack({ ok: false });
            }
            await socket.join(boardRoom(boardId));
            ack({ ok: true });
        } catch {
            ack({ ok: false });
        }
    });

    socket.on(SOCKET_EVENTS.LEAVE_BOARD, boardId => {
        if (!Number.isInteger(boardId)) return;
        socket.leave(boardRoom(boardId));
    });
}
