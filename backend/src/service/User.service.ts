import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export class UserService {
  static async getAllUser(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  static async getByIdUser(id: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id }
    });
  }

  static async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return await prisma.user.create({ data });
  }

  static async updateUser(id: number, data: Partial<User>): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data
    });
  }

  static async deleteUser(id: number): Promise<User> {
    return await prisma.user.delete({
      where: { id }
    });
  }

  static async getByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }
}
