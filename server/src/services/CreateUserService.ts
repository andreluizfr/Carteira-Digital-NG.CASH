import User from "../entities/User";
import Account from "../entities/Account";
import IUsersRepository from "../repository/IUsersRepository";
import IAccountsRepository from "../repository/IAccountsRepository";
import { createAccessToken } from "../auth";

interface ICreateUserRequestDTO{
    username: string,
    password: string
}

interface ICreateUser {
    username: string,
    password: string,
    accountId: string
}

export default class CreateUserService{

    //depende da interface do repositório mas não da implementação em si
    constructor (private usersRepository: IUsersRepository, private accountsRepository: IAccountsRepository){}

    async execute(data: ICreateUserRequestDTO) {
        
        if(data.username.length < 3)
            throw new Error("Nome de usuário não preenche os requisitos mínimos.");

        //regex para string com pelo menos 8 caracteres, 1 letra minúscula, 1 maiúscula e 1 número
        const passwordExp : RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$&*]{8,}$/;
        if(!passwordExp.test(data.password))
            throw new Error("Senha não preenche os requisitos mínimos.");
            
        //procurando se nome de usuário já existe no banco
        const user = await this.usersRepository.findByUsername(data.username);

        if(!user){

            //criando conta no banco de dados com balance de 100
            const account = new Account({balance: 100});
            const createdAccount = await this.accountsRepository.createAccount(account);

            if(createdAccount){

                //criando objeto de usuário pela interface da request e acrescentando o id da conta criada
                const user = data as ICreateUser
                user.accountId = createdAccount.id;

                //criando usuário no banco de dados
                const newUser = new User(user);
                const createdUser = await this.usersRepository.createUser(newUser);

                if(createdUser){

                    const accessToken = createAccessToken(createdUser.username);
                    return {createdUser: createdUser, createdAccount: createdAccount, accessToken: accessToken};
                }

                else {
                    //se usuário não foi criado, deletar conta que foi criada
                    await this.accountsRepository.deleteAccount(createdAccount);
                    throw new Error("Usuário não pode ser criado.");
                }

            } else throw new Error("Conta não pode ser criada.");

        } else throw new Error("Nome de usuário já existe.");

    }

}