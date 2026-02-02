

import { prisma } from "../../prisma";

export const bookUpdateRepository = {
  async update(
    id: number,
    data: {
      title?: string;
      author?: string;
      category?: string;
      synopsis?: string;
      stars?: number;
    }
  ) {
    return prisma.book.update({
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
  },
};

