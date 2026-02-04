import {z} from 'zod';

export const createBookSchema = z.object({
    title: z.string('titulo é obrigatório').min(3,'Título deve ter no mínimo 3 caracteres'),
    author: z.string('Autor é obrigatório').min(3, 'Autor deve ter no mínimo 3 caracteres'),
    category: z.string('Categoria é obrigatória').min(3, 'Categoria deve ter no mínimo 3 caracteres'),
    synopsis: z.string('Sinopse é obrigatória').min(10, "Sinopse deve ter pelo menos 10 caracteres"),
});

export type createBookDTO = z.infer<typeof createBookSchema>;