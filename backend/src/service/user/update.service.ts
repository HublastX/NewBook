import { updateUserRepository } from "../../repositories/user/updateUserRepositories";
import { createUserRepository } from "../../repositories/user/createUserRepositories";
import { UpdateUserDTO } from "../../schema/user/updateUser.schema";
import bcrypt from 'bcrypt';

export const updateUserService = {
    async execute(id: number, data: UpdateUserDTO){

        if(data.email){
            const emailExists = await createUserRepository.findByEmail(data.email);

            if(emailExists && emailExists.id !== id){
                throw new Error("Email já esta em uso")
            }

        }

        if(data.password){
            data.password = await bcrypt.hash(data.password, 10);
        }

        const user = await updateUserRepository.update(id,data);

        return user
    }
}