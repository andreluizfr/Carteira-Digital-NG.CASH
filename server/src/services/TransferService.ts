import IAccountsRepository from "../repository/IAccountsRepository";
import IUsersRepository from "../repository/IUsersRepository";
import ITransactionsRepository from "../repository/ITransactionsRepository";

import CashOutService from "./CashOutService";
import CashInService from "./CashInService";

import CreateTransactionService from "./CreateTransactionService";

interface ITransferRequestDTO{
    creditedUsername: string
    debitedUsername: string
    value: number
}

export default class TransferService{

    //depende da interface do repositório mas não da implementação em si
    constructor (private accountsRepository: IAccountsRepository,
                 private usersRepository: IUsersRepository,
                 private transactionsRepository: ITransactionsRepository){}

    async execute(data: ITransferRequestDTO) {

        if(data.creditedUsername != data.debitedUsername){

            //buscando as informaçoes dos usuários
            const creditedUser = await this.usersRepository.findByUsername(data.creditedUsername);
            const debitedUser = await this.usersRepository.findByUsername(data.debitedUsername);

            if(creditedUser && debitedUser){

                //buscando as 2 contas
                const accountToBeCredited = await this.accountsRepository.findById(creditedUser.accountId);
                const accountToBeDebited = await this.accountsRepository.findById(debitedUser.accountId);

                data.value = Number(data.value.toFixed(2));
                
                if(data.value > 0){

                    //contas devem existir e a conta a ser creditada tem que ter saldo suficiente
                    if(accountToBeCredited && accountToBeDebited && accountToBeCredited.balance >= data.value){

                        const cashOutService = new CashOutService(this.accountsRepository);
                        const cashInService = new CashInService(this.accountsRepository);
                        const createTransactionService = new CreateTransactionService(this.transactionsRepository);
                        
                        const creditedAccount = await cashOutService.execute(accountToBeCredited, data.value);
                        const debitedAccount = await cashInService.execute(accountToBeDebited, data.value);

                        //salvando transação no banco
                        const createdTransaction = await createTransactionService.execute({
                            creditedUsername: creditedUser.username,
                            debitedUsername: debitedUser.username,
                            creditedAccountId: creditedAccount.id,
                            debitedAccountId: debitedAccount.id,
                            value: data.value
                        });

                        return { createdTransaction: createdTransaction };

                    } else throw new Error("Falha ao fazer transferência.");

                } else throw new Error("Quantia tem que ser positiva e maior que 0.");

            } else throw new Error("Falha ao buscar usuários.");

        } else throw new Error("Transação inválida.");

    }

}