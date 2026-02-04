

import { prisma } from "../../prisma";
import Book from "../../types/book.types";

export const bookUpdateRepository = {
  async update(id: number, data: Book) {
    const book = await prisma.book.update({
      where: { id },
      data,
      select: {
        id: true,
        title: true,
        author: true,
        category: true,
        synopsis: true,
        stars: true,
        updatedAt: true,
      },
    });
    return book;
  },
};




