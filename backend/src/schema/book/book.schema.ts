import {z} from 'zod';



export const createBookSchema = z.object({
    title: z.string('titulo é obrigatório').min(3,'Título deve ter no mínimo 3 caracteres'),
    author: z.string('Autor é obrigatório').min(3, 'Autor deve ter no mínimo 3 caracteres'),
    category: z.string('Categoria é obrigatória').min(3, 'Categoria deve ter no mínimo 3 caracteres'),
    synopsis: z.string('Sinopse é obrigatória').min(10, "Sinopse deve ter pelo menos 10 caracteres"),
  stars: z.number().min(0).max(5).optional(),
});


export const getBookByIdSchema = z.object({
  params: z.object({
    id: z
      .string()
      .regex(/^\d+$/, "ID deve ser um número")
      .transform(Number),
  }),
});





export const updateBookSchema = z.object({
  title: z.string().nonempty("Título é obrigatório").optional(),
  author: z.string().nonempty("Autor é obrigatório").optional(),
  category: z.string().optional(),
  synopsis: z.string().optional(),
  stars: z.number().int().min(0).max(5).optional(),
});




export const deleteBookSchema = z.object({
  params: z.object({
    id: z
      .string()
      .regex(/^\d+$/, "ID deve ser um número")
      .transform(Number),
  }),
});
