import User from '../entities/User';

export default interface IUsersRepository{

    findByUsername(username: string): Promise <User | null>;
    createUser(user: User): Promise <User | null>;

}