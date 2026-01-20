// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../prisma";
import jwt from "jsonwebtoken";
import {userSchema} from "../validation/authValidation"
import { authRepository } from "../repositories/authRepository";

const SALT_ROUNDS = 10;


export const createUser = async (req: Request, res: Response) => { 
  try { 
    
    const parsed = userSchema.safeParse(req.body); 
    
  if (!parsed.success) { return res.status(400).json({ errors: parsed.error.format() }); } 


  const { name, email, password } = parsed.data; 



   const existingUser = await authRepository.findByEmail(email); 
   if (existingUser) { return res.status(400).json({ message: "Email já cadastrado" }); } 

   
   const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS); 

    const user = await authRepository.create(name, email, hashedPassword); 
    return res.status(201).json({ message: "Usuário criado com sucesso", user }); 

  } catch (error) { console.error(error); 
    return res.status(500).json({ message: "Erro ao criar usuário" }); } };







export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: "Credenciais inválidas" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Credenciais inválidas" });

      const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" } 
    );

    return res.status(200).json({ message: "Login realizado com sucesso", token });
  } catch (error) {
    console.error(error);
return res.status(500).json({ message: "Erro interno no servidor" });

  }
};
