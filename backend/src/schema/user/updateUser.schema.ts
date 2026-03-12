import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(["ADMIN", "USER"]).optional()
});

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;