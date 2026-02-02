import { Request, Response } from "express";
import { bookDeleteRepository } from "../../repositories/book/deleteBookRepository";
import { deleteBookSchema } from "../../schema/book/book.schema";

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const parsed = deleteBookSchema.parse({ params: req.params });
    const { id } = parsed.params;

    await bookDeleteRepository.delete(id);

    return res.status(200).json({ message: "Livro deletado com sucesso" });
  } catch (error: any) {
    // Registro não encontrado
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Livro não encontrado" });
    }

    // Erro de validação Zod
    if (error?.issues) {
      return res.status(400).json({ message: "ID inválido", errors: error.issues });
    }

    return res.status(500).json({ message: "Erro ao deletar" });
  }
};
