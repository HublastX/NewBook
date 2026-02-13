import { Request,Response } from "express";
import { getBookIdRepository } from "../../repositories/book/getBookByIdRepository";
import { getBookByIdSchema } from "../../schema/book/book.schema";


export const getById = async (req: Request, res: Response) =>{
try{

    const parsed = getBookByIdSchema.parse({params: req.params})

    const {id} = parsed.params

    const  book = await getBookIdRepository.findById(Number(id))

    if (!book){
        return res.status(404).json({ message: "Livro não encontrado"})
    }

     return res.status(200).json({
      message: "Livro encontrado com sucesso",
      book
    });

}catch(error){
    return res.status(500).json({message: "Error ao buscar book"})
}
}