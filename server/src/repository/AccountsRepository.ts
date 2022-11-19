import Account from "../entities/Account";
import IAccountsRepository from "./IAccountsRepository";
import { AppDataSource } from "../database/postgres";


export default new class AccountsRepository implements IAccountsRepository{

    async findById (id: string) : Promise <Account | null> {
        const accountRepository = AppDataSource.getRepository(Account);
        const account = await accountRepository.findOneBy({id: id});
        return account;
    }

    async createAccount (account: Account): Promise<Account | null> {
        const accountRepository = AppDataSource.getRepository(Account);
        const createdAccount = await accountRepository.save(account);
        return createdAccount;
    }

    async updateAccount (account: Account): Promise<Account | null> {
        const accountRepository = AppDataSource.getRepository(Account);
        const updatedAccount = await accountRepository.save(account);
        return updatedAccount;
    }

    async deleteAccount (account: Account): Promise<void> {
        const accountRepository = AppDataSource.getRepository(Account);
        await accountRepository.remove(account);
    }

}