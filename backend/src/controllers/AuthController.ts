import { Request, Response } from "express";
import { UserService } from "../service/User.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { registerSchema, loginSchema } from "../schemas/authSchema";

dotenv.config();


export class AuthController {
  // Registro de usuário
  static async register(req: Request, res: Response) {
    // 1) validar input
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      // zod formata os erros por campo
      return res.status(400).json({ errors: parsed.error.format() });
    }
    const { name, email, password, role } = parsed.data;
    
    try {

      const emailExists = await UserService.getByEmail(email);
      if (emailExists) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await UserService.createUser({ name, email, password: hashedPassword, role });

      return res.status(201).json({ message: "User registered successfully", user });
    } catch (error: unknown) {
      if (error instanceof Error) return res.status(400).json({ message: error.message });
      return res.status(400).json({ message: "Unexpected error" });
    }
  }

  // Login
  static async login(req: Request, res: Response) {
    // 1) validar input
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.format() });
    }
    const { email, password } = parsed.data;

    
    try {
      const user = await UserService.getByEmail(email);
      if (!user) return res.status(401).json({ message: "Invalid credentials" });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

      const payload = { id: user.id, email: user.email, role: user.role };
      const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1h" });

      return res.json({ token });
    } catch (error: unknown) {
      if (error instanceof Error) return res.status(400).json({ message: error.message });
      return res.status(400).json({ message: "Unexpected error" });
    }
  }
}
