import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { authenticateToken } from "../middlewares/auth.Middleware";

const router = Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/me", authenticateToken, authController.me);

router.post("/logout", authenticateToken, authController.logout);

export default router;
