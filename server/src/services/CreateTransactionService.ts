import Transaction from "../entities/Transaction";
import ITransactionsRepository from "../repository/ITransactionsRepository";

interface ICreateTransactionDTO{
    creditedUsername: string,
    debitedUsername: string,
    debitedAccountId: string
    creditedAccountId: string
    value: number
}

export default class CreateTransactionService{

    //depende da interface do repositório mas não da implementação em si
    constructor (private transactionsRepository: ITransactionsRepository){}

    async execute(data: ICreateTransactionDTO) {

        const transaction = new Transaction(data);

        const createdTransaction = await this.transactionsRepository.createTransaction(transaction);

        if(createdTransaction)
            return createdTransaction;
        
        else throw new Error('Sua transação foi concluída mas houve uma falha ao salvar no sistema. Por favor, ligue para central.');
        
    }

}