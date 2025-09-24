import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.post("/users", userController.createUser);
router.get("/users", userController.getAllUsers);

export default router;
