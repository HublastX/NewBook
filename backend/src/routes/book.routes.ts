import { Router } from "express";
import { controllerBook } from "../controllers/book/index"

const router = Router();

//routes book
router.post('/book', controllerBook.create);
router.delete('/book/id:', controllerBook.deleteBook);
router.get('/book', controllerBook.getBook);
router.get('/book/id:', controllerBook.getById);
router.post('/book', controllerBook.update);

export{router};


