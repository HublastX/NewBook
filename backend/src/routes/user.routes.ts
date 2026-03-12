import { Router } from "express";
import { controllerUser } from "../controllers/user";

const routerUser = Router();

//routes book
routerUser.post('/user', controllerUser.create);
routerUser.put('/user/:id', controllerUser.update)


export{routerUser};


