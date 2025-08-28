import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class UserController {
  // Lista todos usuários (só admin)
  static async getAllUser(req: Request & { user?: any }, res: Response) {
    try {
      const loggedUser = req.user;
      if (!loggedUser || loggedUser.role !== "ADMIN") {
        return res.status(403).json({ message: "Acesso negado." });
      }

      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return res.json(users);
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });
      return res.status(500).json({ message: "Erro inesperado." });
    }
  }

  // Lista usuário por ID
  static async getByIdUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) return res.status(404).json({ message: "User not found!" });
      return res.json(user);
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });
      return res.status(500).json({ message: "Erro inesperado." });
    }
  }

  // Atualiza usuário
  static async updateUser(req: Request & { user?: any }, res: Response) {
    const id = Number(req.params.id);
    const loggedUser = req.user;
    const { name, email, password, role } = req.body;

    if (!loggedUser || (loggedUser.role !== "ADMIN" && loggedUser.id !== id)) {
      return res.status(403).json({ message: "Acesso negado." });
    }

    try {
      const existingUser = await prisma.user.findUnique({ where: { id } });
      if (!existingUser)
        return res.status(404).json({ message: "User not found." });

      const updateData: Partial<{
        name: string;
        email: string;
        password: string;
        role: string;
      }> = {};

      if (name !== undefined) updateData.name = name;
      if (email !== undefined) updateData.email = email;
      if (password !== undefined)
        updateData.password = await bcrypt.hash(password, 10);
      if (role !== undefined && loggedUser.role === "ADMIN") updateData.role = role;

      const updated = await prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return res.json({ message: "User updated successfully!", updated });
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
      return res.status(400).json({ message: "Unexpected error" });
    }
  }

  // Deleta usuário
  static async deleteUser(req: Request & { user?: any }, res: Response) {
    const id = Number(req.params.id);
    const loggedUser = req.user;

    if (!loggedUser || (loggedUser.role !== "ADMIN" && loggedUser.id !== id)) {
      return res.status(403).json({ message: "Acesso negado." });
    }

    try {
      await prisma.user.delete({ where: { id } });
      return res.status(204).send("User Deleted Successfully!");
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
      return res.status(400).json({ message: "Unexpected error" });
    }
  }
}
