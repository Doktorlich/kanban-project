import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { SOCKET_EVENTS } from "@myapp/shared-types";
import { columnKeys } from "@/lib/column";
import { connectSocket, disconnectSocket, socket } from "@/lib/socket";

export default function useBoardSocket(boardId: number, isDragging: boolean) {
    const queryClient = useQueryClient();
    const isDraggingRef = useRef(isDragging);
    const hasPendingUpdateRef = useRef(false);

    useEffect(() => {
        isDraggingRef.current = isDragging;
        if (!isDragging && hasPendingUpdateRef.current) {
            hasPendingUpdateRef.current = false;
            queryClient.invalidateQueries({ queryKey: columnKeys.list(boardId) });
        }
    }, [isDragging, boardId, queryClient]);

    useEffect(() => {
        function handleTasksReordered() {
            if (isDraggingRef.current) {
                hasPendingUpdateRef.current = true;
                return;
            }
            queryClient.invalidateQueries({ queryKey: columnKeys.list(boardId) });
        }
        function joinBoard() {
            socket.emit(SOCKET_EVENTS.JOIN_BOARD, boardId, result => {
                if (!result.ok) console.warn("Failed to subscribe to the board updates", boardId);
            });
        }

        function handleConnectError(error: Error) {
            console.warn("Ошибка подключения сокета:", error.message);
        }

        socket.on(SOCKET_EVENTS.TASKS_REORDERED, handleTasksReordered);
        socket.on("connect", joinBoard);
        socket.on("connect_error", handleConnectError);

        connectSocket();
        if (socket.connected) joinBoard();

        return () => {
            socket.off(SOCKET_EVENTS.TASKS_REORDERED, handleTasksReordered);
            socket.off("connect", joinBoard);
            socket.off("connect_error", handleConnectError);
            disconnectSocket();
        };
    }, [boardId, queryClient]);
}
