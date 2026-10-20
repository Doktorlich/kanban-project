import type { Socket } from "socket.io";
import type { ClientToServerEvents, ServerToClientEvents } from "@myapp/shared-types";

export interface SocketData {
    userId: number;
}
export type AppSocket = Socket<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;
