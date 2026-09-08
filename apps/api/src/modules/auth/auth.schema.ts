import { z } from "zod";

export const registerSchema = z.object({
    email: z
        .string()
        .trim()
        .pipe(z.email({ message: "Invalid email address" })),
    password: z.string().min(8, "Min 8 symbols").max(50, "Max 50 symbols"),
    username: z.string().trim().min(5, "Min 5 symbols").max(70, "Max 70 symbols"),
    firstName: z.string().trim().min(2, "Min 2 symbols").max(150, "Max 150 symbols"),
    lastName: z.string().trim().min(2, "Min 2 symbols").max(150, "Max 150 symbols"),
});

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .pipe(z.email({ message: "Invalid email address" })),
    password: z.string().min(1, "Password is required"),
});
