

import { prisma } from "../../prisma";

export const bookDeleteRepository = {
  async delete(id: number) {
    return prisma.book.delete({
      where: { id },
    });
  },
};
