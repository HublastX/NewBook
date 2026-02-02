import { Request, Response } from "express";
import { bookUpdateRepository } from "../../repositories/book/updateBookRepository";
import { updateBookSchema } from "../../schema/book/book.schema";

export const update = async (req: Request, res: Response) => {
  try {
    const parsed = updateBookSchema.parse(req.body);
    const { id } = req.params;

    const updateBook = await bookUpdateRepository.update(Number(id), parsed);

    return res.status(200).json({
      message: "Atualizado com sucesso",
      book: updateBook,
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
