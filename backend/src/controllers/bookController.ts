import { Request, Response } from "express";
import { prisma } from "../prisma";

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, category, synopsis, stars } = req.body;

    if (!title || !author || !category) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const book = await prisma.book.create({
      data: { title, author, category, synopsis, stars },
    });

    return res.status(201).json({ message: "Book criado com sucesso", book });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar Book" });
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany({
      select: { id: true, title: true, author: true, createdAt: true, updatedAt: true },
  
    });

    return res.json(books);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar livros" });
  }
};

export const getBookId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const book = await prisma.book.findUnique({ where: { id } });

    if (!book) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }

    return res.json(book);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar livro" });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, author, category, synopsis, stars } = req.body;

    const book = await prisma.book.update({
      where: { id },
      data: { title, author, category, synopsis, stars },
    });

    return res.json({message: "atualizado com Sucesso", book});
  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar" });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.book.delete({ where: { id } });

    return res.json({ message: "Livro deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao deletar" });
  }
};
