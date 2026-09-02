import { apiFetch } from "./api";

interface LoginPayload {
    email: string;
    password: string;
    rememberMe?: string | null;
}

export function loginUser(payload: LoginPayload) {
    return apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}
