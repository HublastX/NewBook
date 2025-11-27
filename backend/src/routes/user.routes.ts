// src/routes/user.routes.ts
import { Router } from "express";
import { listUsers, getUser, updateUser, deleteUser } from "../controllers/user.controller";
import { requireAuth } from "../minddlewares/auth.middleware";

const router = Router();

// Todas as rotas de User ficam protegidas
router.get("/", requireAuth, listUsers);
router.get("/:id", requireAuth, getUser);
router.put("/:id", requireAuth, updateUser);
router.delete("/:id", requireAuth, deleteUser);

export default router;
