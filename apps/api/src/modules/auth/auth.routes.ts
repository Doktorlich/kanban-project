import { Router } from "express";
import { login, logout, refresh, register } from "./auth.controller";
import { requireAuth } from "../../middleware/auth.middleware";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/refresh", refresh);

authRouter.get("/me", requireAuth, (req, res) => {
    res.json({ userId: req.userId });
});
