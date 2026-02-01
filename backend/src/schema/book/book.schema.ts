import {z} from 'zod';

export const createBookSchema = z.object({
    title: z.string().min(1,'Título é obrigatório'),
    author: z.string().min(1, 'Autor é obrigatório'),
    category: z.string().min(1, 'Categoria é obrigatória'),
    synopsis: z.string().min(10, "Sinopse deve ter pelo menos 10 caracteres"),
});

export type createBookDTO = z.infer<typeof createBookSchema>;