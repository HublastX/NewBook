import { Request, Response } from "express";
import { createUserSchema } from "../../schema/user/user.schema";
import { createUserService } from "../../service/user/create.service";
import { ZodError } from "zod";

export const create = async (req: Request, res: Response) => {
  try {

    const data = createUserSchema.parse(req.body);

    const user = await createUserService.execute(data);

    return res.status(201).json({
      message: "User criado com sucesso",
      user,
    });

  } catch (error: any) {

    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: error.issues,
      });
    }

    if (error.message === "Email já está em uso") {
      return res.status(409).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Erro ao criar User",
    });
  }
};