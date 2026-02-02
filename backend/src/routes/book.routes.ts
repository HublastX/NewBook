import {Router} from "express";
import {controllerBook} from "../controllers/book/index"

const router = Router();

router.post('/book', controllerBook.createBook);

export{router};


