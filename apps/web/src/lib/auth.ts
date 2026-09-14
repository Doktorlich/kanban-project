import { apiFetch } from "./api";

import { z } from "zod";
import { authSchema } from "@myapp/shared-types";

type LoginPayload = z.infer<typeof authSchema.loginSchema>;
type RegisterPayload = z.infer<typeof authSchema.registerSchema>;

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
