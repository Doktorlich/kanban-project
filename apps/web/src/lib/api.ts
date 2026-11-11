import { socket } from "@/lib/socket";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
    const isFormData = options?.body instanceof FormData;
    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        credentials: "include",
        headers: {
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            ...options?.headers,
            ...(socket.id ? { "X-Socket-Id": socket.id } : {}),
        },
    });
    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message ?? "Request failed");
    }
    if (response.status === 204) {
        return undefined as T;
    }
    return response.json();
}
