import { bookRepository } from "../../repositories/book/createBookRepositories";
import { createBookDTO } from "../../schema/book/book.schema";

export const bookService = {
    async create(data: createBookDTO) {
        return bookRepository.create({
            ...data,
            liker: 0,
            stars: 0,
            status: "AVAILABLE"
        });
    },
};