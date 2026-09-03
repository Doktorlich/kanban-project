import { apiFetch } from "./api";

interface LoginPayload {
    email: string;
    password: string;
    rememberMe?: string | null;
}
interface RegisterPayload {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    privacyPolicy?: string | null;
}
export function loginUser(payload: LoginPayload) {
    return apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function registerUser(payload: RegisterPayload) {
    return apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function logoutUser() {
    return apiFetch("/auth/logout", {
        method: "POST",
    });
}

export function refreshToken() {
    return apiFetch("/auth/refresh", {
        method: "POST",
    });
}
