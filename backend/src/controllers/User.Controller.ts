import { Request, Response } from "express";
import { UserService } from '../service/User.service';
import { User } from '@prisma/client';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

export class UserController {
  // User list
  static async getAllUser(req: Request, res: Response) {
    const users = await UserService.getAllUser();
    return res.json(users);
  };

  // User list by id
  static async getByIdUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = await UserService.getByIdUser(id);
    if (!user) return res.status(404).json({ message: 'User not found!' });
    return res.json(user);
  };

  // User registration:
  static async CreateUser(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;

      // Basic validations
      if (!name || typeof name !== "string" || name.trim().length === 0) {
        return res.status(400).json({ message: "The name is required and must be a valid string." });
      }

      if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: "A valid email is required." });
      }

      if (!password || typeof password !== "string" || password.length < 6) {
        return res.status(400).json({ message: "The password is required and must be at least 6 characters long." });
      }

      // Check if email already exists
      const emailExists = await UserService.getByEmail(email);
      if (emailExists) {
        return res.status(400).json({ message: "This email is already registered." });
      }

      // Generate password hash (saltRounds = 10)
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await UserService.createUser({
        name,
        email,
        password: hashedPassword,  // use the encrypted password
        role
      });

      return res.status(201).json({ message: 'Registration completed successfully! ', user });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "Ocorreu um erro inesperado." });

    }
  }

  // User registration update
  static async updateUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { name, email, password, role } = req.body;

    try {
      // 🛠 Verifica se o usuário existe antes de atualizar
      const existingUser = await UserService.getByIdUser(id);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found." });
      }

      const updateData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>> = {};


      // Validação do nome (se for enviado)
      if (name !== undefined) {
        if (typeof name !== "string" || name.trim().length === 0) {
          return res.status(400).json({ message: "The name must be a valid string." });
        }
        updateData.name = name;
      }

      // Validação do e-mail (se for enviado)
      if (email !== undefined) {
        if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
          return res.status(400).json({ message: "A valid email is required." });
        }
        // Verifica duplicidade (se for diferente do atual)
        if (email !== existingUser.email) {
          const emailExists = await UserService.getByEmail(email);
          if (emailExists) {
            return res.status(400).json({ message: "This email is already registered." });
          }
        }
        updateData.email = email;
      }

      // Validação da senha (se for enviada)
      if (password !== undefined) {
        if (typeof password !== "string" || password.length < 6) {
          return res.status(400).json({ message: "The password must be at least 6 characters long." });
        }
        // Gera hash da nova senha
        updateData.password = await bcrypt.hash(password, 10);
      }

      // Atualiza role (se for enviada)
      if (role !== undefined) {
        updateData.role = role;
      }

      const updated = await UserService.updateUser(id, updateData);
      return res.json({ message: "User updated successfully!", updated });

    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: "An unexpected error has occurred." });
    }
  }

  // Delete user
  static async deleteUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      await UserService.deleteUser(id);
      return res.status(204).send('User Deleted Successfully!');
    } catch (error: unknown) {

      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(400).json({ message: "An unexpected error has occurred." });
    }
  };

  // login
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required!' })
    };

    try {
      // Busca usuário pelo email
      const user = await UserService.getByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      // Compara a senha enviada com a senha hash do banco
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      // Cria o payload do token (pode incluir id, role, etc)
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      // Gera token JWT
      const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: '1h', // token válido por 1 hora, ajuste conforme precisar
      });

      // Retorna o token
      return res.json({ token });
    } catch (error: unknown) {

      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(400).json({ message: "Ocorreu um erro inesperado." });
    }
  }
};