import {prisma} from '../../prisma'


export const getBookRepository = {
    async findAll (){
        return prisma.book.findMany({
        select: {
        id: true,
        title: true,
        author: true,
        createdAt: true,
        updatedAt: true,
            }
        })

    }
}