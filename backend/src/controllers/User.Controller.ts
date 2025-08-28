import { Request, Response } from "express";
import { UserService } from '../service/User.service';
import { User } from '@prisma/client';
import bcrypt from "bcrypt";

export class UserController {
  // Lista todos usuários (só admin pode acessar)
  static async getAllUser(req: Request, res: Response) {
    const users = await UserService.getAllUser();
    return res.json(users);
  }

  // Lista usuário por id
  static async getByIdUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = await UserService.getByIdUser(id);
    if (!user) return res.status(404).json({ message: 'User not found!' });
    return res.json(user);
  }


  // Atualiza usuário
static async updateUser(req: Request & { user?: any }, res: Response) {
  const id = Number(req.params.id);
  const loggedUser = req.user; // vem do authMiddleware
  const { name, email, password, role } = req.body;

  // Verifica se é admin ou o próprio usuário
  if (loggedUser.role !== "ADMIN" && loggedUser.id !== id) {
    return res.status(403).json({ message: "Acesso negado." });
  }

  try {
    const existingUser = await UserService.getByIdUser(id);
    if (!existingUser) return res.status(404).json({ message: "User not found." });

    const updateData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>> = {};

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (password !== undefined) updateData.password = await bcrypt.hash(password, 10);
    if (role !== undefined && loggedUser.role === "ADMIN") updateData.role = role; // só admin pode alterar role

    const updated = await UserService.updateUser(id, updateData);
    return res.json({ message: "User updated successfully!", updated });
  } catch (error: unknown) {
    if (error instanceof Error) return res.status(400).json({ message: error.message });
    return res.status(400).json({ message: "Unexpected error" });
  }
}

// Deleta usuário
static async deleteUser(req: Request & { user?: any }, res: Response) {
  const id = Number(req.params.id);
  const loggedUser = req.user;

  // Verifica se é admin ou o próprio usuário
  if (loggedUser.role !== "ADMIN" && loggedUser.id !== id) {
    return res.status(403).json({ message: "Acesso negado." });
  }

  try {
    await UserService.deleteUser(id);
    return res.status(204).send('User Deleted Successfully!');
  } catch (error: unknown) {
    if (error instanceof Error) return res.status(400).json({ message: error.message });
    return res.status(400).json({ message: "Unexpected error" });
  }
}
