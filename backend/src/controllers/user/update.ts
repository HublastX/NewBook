import { Request, Response } from "express";
import { updateUserService } from "../../service/user/update.service";
import { updateUserSchema } from "../../schema/user/updateUser.schema";
import { ZodError } from 'zod';

export const update = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const data = updateUserSchema.parse(req.body);

        const user = await updateUserService.execute(id, data);

        return res.status(200).json({
            message: "User atualizado com sucesso",
            user,
        });
    } catch (error){

        if(error instanceof ZodError){
            return res.status(400).json({
                message: "Dados inválidos",
                errors: error.issues,
            });
        }

        if(error instanceof Error) {
            return res.status(400).json({
                message: error.message,
            });
        }

        return res.status(500).json({
            message: "Erro ao atualizar User",
        });
    }
}