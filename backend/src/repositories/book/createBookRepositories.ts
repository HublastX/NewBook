import { prisma } from "../../prisma";

export const createBookRepository = {
  async create(data: {
    title: string;
    author: string;
    category: string;
    synopsis?: string;
    stars?: number;
    status?: string;
  }) {
    return prisma.book.create({
      data: {
        title: data.title,
        author: data.author,
        category: data.category,
        // se undefined, passa string vazia
        synopsis: data.synopsis ?? "",
        stars: data.stars ?? 0,
        status: data.status ?? "Disponível",
      },
      select: {
        id: true,
        title: true,
        author: true,
        category: true,
        synopsis: true,
        stars: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },
};
