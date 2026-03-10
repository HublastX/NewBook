import { Request, Response } from "express";
import { createUserRepository } from "../../repositories/user/createUserRepositories";
import { createUserSchema } from "../../schema/user/user.schema";
import { ZodError } from "zod";


export const create = async (req: Request, res: Response) => {
    try {

    const data = createUserSchema.parse(req.body);

    const user = await createUserRepository.create(data);

    return res.status(201).json({
      message: "User criado com sucesso",
      user,
    });

  } catch (error) {

    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: error.issues,
      });
    }

    return res.status(500).json({
      message: "Erro ao criar User",
    });
  }
};