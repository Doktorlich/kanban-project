import { io, type Socket } from "socket.io-client";
import type { ClientToServerEvents, ServerToClientEvents } from "@myapp/shared-types";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not set");
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(API_URL, {
    withCredentials: true,
    autoConnect: false,
});

export function connectSocket() {
    if (!socket.connected) socket.connect();
}

export function disconnectSocket() {
    socket.disconnect();
}
