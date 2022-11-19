import Transaction from '../entities/Transaction';

export default interface ITransactionsRepository{

    createTransaction(transaction: Transaction): Promise <Transaction | null>;
    findById(id: string): Promise <Transaction | null>;
    findByAccountId(accountId: string): Promise <Transaction[] | null>;

}