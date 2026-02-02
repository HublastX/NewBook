import { Request, Response } from "express";
import { createBookRepository } from "../../repositories/book/createBookRepositories";
import { createBookSchema } from "../../schema/book/book.schema";
import { ZodError } from "zod";

export const create = async (req: Request, res: Response) => {
  try {
   
    const data = createBookSchema.parse(req.body);

    const book = await createBookRepository.create(data);


    return res.status(201).json({
      message: "Book criado com sucesso",
      book,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: error.issues,
      });
    }

    return res.status(500).json({
      message: "Erro ao criar Book",
    });
  }
};
