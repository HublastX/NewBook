import z, { email } from 'zod';

export const createUserSchema  = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().min(1, 'Email é obrigatório').email('email inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    role: z.enum(['ADMIN', 'USER']).optional()
});



export type CreateUserDTO = z.infer<typeof createUserSchema>; 