import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export class UserService {
  async createUser(data: { name: string; cpf: string; email: string; password: string; phone?: string; birthDate?: Date; role?: string }): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async deleteUser(id: number): Promise<User> {
    return prisma.user.delete({ where: { id } });
  }
}
