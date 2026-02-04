import { Request,Response } from "express";
import { getBookIdRepository } from "../../repositories/book/getBookByIdRepository";
import { getBookByIdSchema } from "../../schema/book/book.schema";


const getById = async (req: Request, res: Response) =>{
try{

    const parsed = getBookByIdSchema.parse({parans: req.params})

    const {id} = parsed.params

    const  book = await getBookIdRepository.findById(id)

    if (!book){
        return res.status(404).json({ message: "Livro não encontrado"})
    }


}catch(error){
    return res.status(500).json({message: "Error ao buscar book"})
}
}