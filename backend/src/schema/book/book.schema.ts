import {z} from 'zod';



export const createBookSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  author: z.string().min(1, "Autor é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatória"),
  synopsis: z.string().optional(),
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
