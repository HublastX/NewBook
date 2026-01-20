
// src/repositories/user.repository.ts
import { prisma } from "../prisma";

export const authRepository = {
    
  findByEmail: async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
  },

  create: async (name : string, email: string, password: string) => {
    return prisma.user.create({
      data: { name, email, password },
      select: { id: true, name: true, email: true, createdAt: true },
    });
  },
};
