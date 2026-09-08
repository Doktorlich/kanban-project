import { Request, Response, NextFunction } from "express";
import { z, ZodType } from "zod";

export function validate<T>(schema: ZodType<T>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Validate failed",
                errors: z.flattenError(result.error).fieldErrors,
            });
        }
        req.body = result.data;
        next();
    };
}
