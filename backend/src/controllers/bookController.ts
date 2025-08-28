import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Criar livro
export const createBook = async (req: Request & { user?: any }, res: Response) => {
  try {
    const { title, author, genre, description, status, coverUrl, rating, notes } = req.body;

    if (!title || !author || !genre || !coverUrl) {
      return res.status(400).json({ error: "Campos obrigatórios: título, autor, gênero e capa" });
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        genre,
        description,
        status,
        coverUrl,
        rating,
        notes,
        userId: req.user.id
      }
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar livro" });
  }
};

// Listar livros do usuário (ou todos se admin)
export const getBooks = async (req: Request & { user?: any }, res: Response) => {
  try {
    const { title, author, genre, status } = req.query;

    const filters: any = {};
    if (title) filters.title = { contains: String(title), mode: "insensitive" };
    if (author) filters.author = { contains: String(author), mode: "insensitive" };
    if (genre) filters.genre = { contains: String(genre), mode: "insensitive" };
    if (status) filters.status = status;

    const books = await prisma.book.findMany({
      where: req.user.role === "ADMIN"
        ? { ...filters }
        : { userId: req.user.id, ...filters },
      orderBy: { addedAt: "desc" }
    });

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar livros" });
  }
};

// Atualizar livro
export const updateBook = async (req: Request & { user?: any }, res: Response) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.findUnique({ where: { id: Number(id) } });

    if (!book) return res.status(404).json({ error: "Livro não encontrado" });

    // Verifica se o livro é do usuário (a não ser que seja admin)
    if (req.user.role !== "ADMIN" && book.userId !== req.user.id) {
      return res.status(403).json({ error: "Você não tem permissão para editar este livro" });
    }

    const updatedBook = await prisma.book.update({
      where: { id: Number(id) },
      data: req.body
    });

    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar livro" });
  }
};

// Deletar livro
export const deleteBook = async (req: Request & { user?: any }, res: Response) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.findUnique({ where: { id: Number(id) } });

    if (!book) return res.status(404).json({ error: "Livro não encontrado" });

    if (req.user.role !== "ADMIN" && book.userId !== req.user.id) {
      return res.status(403).json({ error: "Você não tem permissão para deletar este livro" });
    }

    await prisma.book.delete({ where: { id: Number(id) } });

    res.json({ message: "Livro deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar livro" });
  }
};
