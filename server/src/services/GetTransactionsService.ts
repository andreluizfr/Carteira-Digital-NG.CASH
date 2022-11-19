import ITransactionsRepository from "../repository/ITransactionsRepository";
import IAccountsRepository from "../repository/IAccountsRepository";
import IUsersRepository from "../repository/IUsersRepository";

export default class GetTransactionsService{

    //depende da interface do repositório mas não da implementação em si
    constructor (private transactionsRepository: ITransactionsRepository,
                private accountsRepository: IAccountsRepository,
                private usersRepository: IUsersRepository){}

    async execute(username: string) {

        const user = await this.usersRepository.findByUsername(username);

        if(user){

            const account = await this.accountsRepository.findById(user.accountId);

            if(account){

                const transactions = await this.transactionsRepository.findByAccountId(account.id);

                if(transactions)
                    return transactions;

                else throw new Error("Erro ao buscar transações.");

            } else throw new Error("Erro ao buscar informações.");

        } else throw new Error("Erro ao buscar informações.");
        
    }

}