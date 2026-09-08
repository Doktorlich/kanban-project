import { z } from "zod";

export const workspaceSchema = z.object({
    title: z.string().trim().min(5, "Min 5 symbols").max(255, "Max 255 symbols"),
});
