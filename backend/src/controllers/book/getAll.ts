

import {Request,Response} from "express"
import {getBookRepository} from '../../repositories/book/getbookRepository'

export const getBook = async (req:Request, res: Response) =>{

try{
     const books = await getBookRepository.findAll()
     return res.status(200).json(books);

}catch(error) {
 return res.status(500).json({message: "Erro ao buscar Livro"})
}}

