import { Router } from "express";
import { login, register } from "./auth.controller";
import { requireAuth } from "../../middleware/auth.middleware";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);

authRouter.get("/me", requireAuth, (req, res) => {
    res.json({ userId: req.userId });
});
