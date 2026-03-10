import { Router } from "express";
import { controllerUser } from "../controllers/user";

const routerUser = Router();

//routes book
routerUser.post('/user', controllerUser.create);


export{routerUser};


