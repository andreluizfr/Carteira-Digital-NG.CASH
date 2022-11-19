import Transaction from "../entities/Transaction";
import ITransactionsRepository from "./ITransactionsRepository";
import { AppDataSource } from "../database/postgres";


export default new class TransactionsRepository implements ITransactionsRepository{

    async createTransaction (transaction: Transaction): Promise<Transaction | null> {
        const transactionRepository = AppDataSource.getRepository(Transaction);
        const createdTransaction = await transactionRepository.save(transaction);
        return createdTransaction;
    }

    async findById (id: string) : Promise <Transaction | null> {
        const transactionRepository = AppDataSource.getRepository(Transaction);
        const transaction = await transactionRepository.findOneBy({id: id});
        return transaction;
    }

    async findByAccountId (accountId: string) : Promise <Transaction[] | null> {
        const transactionRepository = AppDataSource.getRepository(Transaction);
        const transactions = await transactionRepository.find({
            where: [
                {debitedAccountId: accountId},
                {creditedAccountId: accountId}
            ]
        });
        return transactions;
    }

}