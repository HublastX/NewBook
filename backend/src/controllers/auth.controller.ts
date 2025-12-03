// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../prisma";
import { signToken } from "../utils/jwt";

const SALT_ROUNDS = 10;

// Criar usuário (signup)
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "name, email e password são obrigatórios" });
    }

    // Verifica se já existe usuário com esse email
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ error: "Email já cadastrado" });

    // Criptografa a senha
    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    // Cria usuário
    const user = await prisma.user.create({
      data: { name, email, password: hash },
      select: { id: true, name: true, email: true, createdAt: true }
    });

    // Gera token JWT
    const token = signToken({ userId: user.id });

    return res.status(201).json({ user, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email e password são obrigatórios" });
    }

    // Busca usuário pelo email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

    // Compara senha digitada com hash do banco
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Credenciais inválidas" });

    // Gera token JWT
    const token = signToken({ userId: user.id });

    return res.status(200).json({
      user: { id: user.id, name: user.name, email: user.email },
      token
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao fazer login" });
  }
};
