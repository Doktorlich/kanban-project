import type { Server as HttpServer } from "http";
import { Server } from "socket.io";
import type { ClientToServerEvents, ServerToClientEvents } from "@myapp/shared-types";
import { socketAuthMiddleware } from "./socket-auth";
import { registerBoardHandlers } from "./board-handlers";
import { SocketData } from "./types";

let io: Server<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData> | null = null;

export function initSocketServer(httpServer: HttpServer) {
    io = new Server<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>(httpServer, {
        cors: { origin: "http://localhost:3000", credentials: true },
    });
    io.use(socketAuthMiddleware);
    io.on("connection", socket => {
        registerBoardHandlers(socket);
    });
    return io;
}

export function getIo() {
    if (!io) throw new Error("Socket server is not initialized");
    return io;
}
