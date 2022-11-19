import IAccountsRepository from "../repository/IAccountsRepository";
import IUsersRepository from "../repository/IUsersRepository";

interface IGetUserRequestDTO{
    username: string
}

export default class GetAccountService{

    //depende da interface do repositório mas não da implementação em si
    constructor (private accountsRepository: IAccountsRepository, private usersRepository: IUsersRepository){}

    async execute(data: IGetUserRequestDTO) {

        const user = await this.usersRepository.findByUsername(data.username);

        if(!user)
            throw new Error("Usuário não encontrado.");

        const account = await this.accountsRepository.findById(user.accountId);

        if(account) return account;

        else throw new Error("Conta não encontrada.");

    }

}