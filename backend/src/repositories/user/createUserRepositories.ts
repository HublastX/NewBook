import { prisma } from "../../prisma";
import { CreateUserDTO } from "../../schema/user/user.schema";

export const createUserRepository = {
    async create(data: CreateUserDTO){
        return prisma.user.create({
            data: {
                ...data,
                role: data.role ?? "USER",
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            }
        })
    },
    async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  },
}