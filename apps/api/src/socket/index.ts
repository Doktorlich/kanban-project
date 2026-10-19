import type { Server as HttpServer } from "http";
import { Server } from "socket.io";
import type { ClientToServerEvents, ServerToClientEvents } from "@myapp/shared-types";

let io: Server<ClientToServerEvents, ServerToClientEvents> | null = null;

export function initSocketServer(httpServer: HttpServer) {
    io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
        cors: { origin: "http://localhost:3000", credentials: true },
    });
    return io;
}

export function getIo() {
    if (!io) throw new Error("Socket server is not initialized");
    return io;
}
