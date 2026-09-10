import { authSchema } from "@myapp/shared-types";
import { z } from "zod";

export const registerFormSchema = authSchema.registerSchema
    .extend({
        confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
