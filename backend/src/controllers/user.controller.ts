import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
  private userService = new UserService();

  createUser = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.createUser(req.body);

      return res.status(201).json({ message: "Usuário criado com sucesso", user });



    } catch (error: any) {
      if (error.code === "P2002") {
        return res.status(400).json({ error: "CPF ou Email já existe" });
      }
      return res.status(500).json({ error: error.message });
    }
  };

  getAllUsers = async (req: Request, res: Response) => {
    const users = await this.userService.getAllUsers();
    return res.json(users);
  };
}

