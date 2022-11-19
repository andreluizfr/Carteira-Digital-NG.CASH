import User from "../entities/User";
import IUsersRepository from "./IUsersRepository";
import { AppDataSource } from "../database/postgres";


export default new class UsersRepository implements IUsersRepository{

    async findByUsername(username: string) : Promise <User | null> {
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOneBy({username: username});
        return user;
    }

    async createUser(user: User) : Promise <User | null> {
        const userRepository = AppDataSource.getRepository(User);
        const createdUser = await userRepository.save(user);
        return createdUser
    };

}