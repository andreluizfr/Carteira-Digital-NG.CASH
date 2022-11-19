import IAccountsRepository from "../repository/IAccountsRepository";
import Account from "../entities/Account";


export default class CashInService{

    //depende da interface do repositório mas não da implementação em si
    constructor (private accountsRepository: IAccountsRepository){}

    async execute(account: Account, value: number) {

        //atualizando saldo da conta no banco de dados
        account.balance = Number(account.balance) + value;
        const updatedAccount = await this.accountsRepository.updateAccount(account);

        if(updatedAccount)
            return updatedAccount;

        else throw new Error("Não foi possível finalizar operação. Por favor, ligue para central para estornar seu dinheiro.");

    }

}