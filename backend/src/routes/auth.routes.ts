import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();

// Rotas de autenticação
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;
