import { Router } from "express";
import { createBook, getBooks, updateBook, deleteBook } from "../controllers/bookController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/", authMiddleware, createBook);
router.get("/", authMiddleware, getBooks);
router.put("/:id", authMiddleware, updateBook);
router.delete("/:id", authMiddleware, deleteBook);

export default router;
