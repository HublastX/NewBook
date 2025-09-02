// src/schemas/authSchema.ts
import { z } from "zod";

// Schema de registro
export const registerSchema = z.object({
  name: z.string().min(1, "Name é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Password deve ter ao menos 8 caracteres"),
  role: z.enum(["USER", "ADMIN"]).optional(),
});
export type RegisterInput = z.infer<typeof registerSchema>;

// Schema de login
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Password é obrigatória"),
});
export type LoginInput = z.infer<typeof loginSchema>;
