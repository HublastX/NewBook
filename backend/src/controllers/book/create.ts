import { Request, Response } from "express";
import { ZodError } from "zod"
import { createBookSchema } from "../../schema/book/book.schema";
import { bookService } from "../../services/book/book.service";

export async function createBook(req:Request, res: Response){

    try{
        const data = createBookSchema.parse(req.body);
        const book = await bookService.create(data);

        return res.status(201).json(book);
    }catch(error:any){
        if (error instanceof ZodError){
            return res.status(400).json({
                error: "Dados invalidos",
                details: error.flatten().fieldErrors,
            });
        }

        console.error(error);

        return res.status(500).json({
            error: "Erro interno do servidor",
        });
    };

};