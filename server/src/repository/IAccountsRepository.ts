import Account from '../entities/Account';

export default interface IAccountsRepository{

    findById(id: string): Promise <Account | null>;
    createAccount(account: Account): Promise <Account | null>;
    updateAccount(account: Account): Promise <Account | null>;
    deleteAccount(account: Account): Promise <void>;

}