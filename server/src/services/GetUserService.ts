import IUsersRepository from "../repository/IUsersRepository";

interface IGetUserRequestDTO{
    username: string
}

export default class GetUserService{

    //depende da interface do repositório mas não da implementação em si
    constructor (private usersRepository: IUsersRepository){}

    async execute(data: IGetUserRequestDTO) {

        const user = await this.usersRepository.findByUsername(data.username);

        if(user) return user;

        else throw new Error("Usuário não encontrado.");

    }

}