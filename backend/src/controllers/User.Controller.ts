import { Request, Response } from "express";
import { UserService } from '../service/User.service';

export class UserController{
    static async getAllUser(req: Request, res: Response){
        const users = await UserService.getAllUser();
        return res.json(users);
    };

    static async getByIdUser(req:Request, res: Response){
        const id = Number(req.params.id);
        const user = await UserService.getByIdUser(id);
        if (!user) return res.status(404).json({message: 'User not found!'});
        return res.json(user);
    };

    static async CreateUser(req: Request, res: Response) {
      try {
        const { name, email, password, role } = req.body;
  
        const user = await UserService.createUser({
          name,
          email,
          password,
          role
        });
  
        return res.status(201).json(user);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    }
  

    static async updateUser(req: Request, res: Response) {
        const id = Number(req.params.id);
        const data = req.body;
        try {
          const updated = await UserService.updateUser(id, data);
          return res.json(updated);
        } catch (error: any) {
          return res.status(400).json({ message: error.message });
        }
      };
    
      static async deleteUser(req: Request, res: Response) {
        const id = Number(req.params.id);
        try {
          await UserService.deleteUser(id);
          return res.status(204).send();
        } catch (error: any) {
          return res.status(400).json({ message: error.message });
        }
      };

};