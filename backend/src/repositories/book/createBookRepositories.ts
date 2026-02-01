import { prisma } from '../../prisma';

export const bookRepository = {
    
    async create(data: {
        title: string,
        author: string,
        category: string,
        synopsis:string,
        liker: number,
        stars: number,
        status: string;
     }) {
        return prisma.book.create({
            data,
            select:{
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
    },

};