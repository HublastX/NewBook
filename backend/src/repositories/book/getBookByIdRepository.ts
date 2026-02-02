

import { prisma } from "../../prisma";

export const getBookIdRepository = {
    async findById(id: number) {
        return prisma.book.findUnique({
            where: {id},
            select: {
                  id: true,
        title: true,
        author: true,
        category: true,
        synopsis: true,
        liker: true,
        stars: true,
        status: true,


            }
        })


    }

}