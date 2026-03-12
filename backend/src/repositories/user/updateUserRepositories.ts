import { prisma } from "../../prisma";
import { UpdateUserDTO } from "../../schema/user/updateUser.schema";

export const updateUserRepository = {
    async update(id: number, data: UpdateUserDTO) {
        return prisma.user.update({
            where: {
                id: Number(id),
            },
            data,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            }
        })
    }
}
