import { Request, Response } from "express";
import { bookUpdateRepository } from "../../repositories/book/updateBookRepository";
import { updateBookSchema } from "../../schema/book/book.schema";

export const update = async (req: Request, res: Response) => {
  try {
    const parsed = updateBookSchema.parse({
      params: req.params,
      body: req.body,
    });

    const bookId = Number(parsed.params.id); // seguro, porque Zod já validou
    const data = parsed.body;

    const book = await bookUpdateRepository.update(bookId, data);

    return res.status(200).json({
      message: "Atualizado com sucesso",
      book,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Livro não encontrado" });
    }

    if (error?.issues) {
      return res.status(400).json({ message: "Dados inválidos", errors: error.issues });
    }

    return res.status(500).json({ message: "Erro ao atualizar" });
  }
};
