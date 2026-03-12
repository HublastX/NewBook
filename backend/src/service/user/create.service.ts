import { createUserRepository } from '../../repositories/user/createUserRepositories';
import { CreateUserDTO } from '../../schema/user/user.schema';
import bcrypt from 'bcrypt';

export const createUserService = {
    async execute(data: CreateUserDTO){
        const emailExists = await createUserRepository.findByEmail(data.email);

        if(emailExists){
            throw new Error("Email já está em uso");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await createUserRepository.create({
            ...data,
            password: hashedPassword
        });

        return user;
    }
}