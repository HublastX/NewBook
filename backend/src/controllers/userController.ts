// src/controllers/user.controller.ts
import { Request, Response } from "express";
import { prisma } from "../prisma";
import bcrypt from "bcrypt";

// Listar todos os usuários
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true }
    });
    return res.json(users);
  } catch (err) {
 
    return res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

// Buscar usuário por ID
export const getUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true }
    });

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    return res.json(user);
  } catch (err) {
    
    return res.status(500).json({ error: "Erro ao buscar usuário" });
  }
};

// Atualizar usuário
export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, email, password } = req.body;

   

    const user = await prisma.user.update({
      where: { id },
      data: { name, email, password},
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true } 
    });

    return res.json({message: "Usuaruo atualizado com sucesso",user});
  } catch (err) {
   
    return res.status(404).json({ error: "Usuário não encontrado ou erro ao atualizar" });
  }
};

// Deletar usuário
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.user.delete({ where: { id } });
    return res.status(200).json({ message: "Usuario deletado com sucesso"});

  } catch (err) {
   
    return res.status(404).json({ error: "Usuário não encontrado ou erro ao deletar" });
  }
};
