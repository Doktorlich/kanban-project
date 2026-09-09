import { Router } from "express";
import { validate } from "../../middleware/validate.middleware";
import * as authController from "./auth.controller";
import { authSchema } from "@myapp/shared-types";

export const authRouter = Router();

authRouter.post("/register", validate(authSchema.registerSchema), authController.register);
authRouter.post("/login", validate(authSchema.loginSchema), authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post("/refresh", authController.refresh);
