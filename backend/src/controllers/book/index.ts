import * as createBook from './create';
import * as getById from "./getId"
import * as getBook from "./get"
import * as update from "./update"
import * as deleteBook from "./delete"

export const controllerBook = {
    ... createBook,
    ... getById,
    ... getBook,
    ... update,
    ... deleteBook
    
};