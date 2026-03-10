import { Router } from "express";
import { controllerBook } from "../controllers/book/index"

const routerBook = Router();

//routes book
routerBook.post('/book', controllerBook.create);
routerBook.delete('/book/:id', controllerBook.deleteBook);
routerBook.get('/book', controllerBook.getBook);
routerBook.get('/book/:id', controllerBook.getById);
routerBook.post('/book', controllerBook.update);

export{routerBook};


