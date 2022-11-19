import { Request, Response } from 'express';
import GetAccountService from '../services/GetAccountService';
import accountsRepository from '../repository/AccountsRepository';
import usersRepository from '../repository/UsersRepository';

export default new class GetBalanceController {

    async handle (req: Request, res: Response): Promise<Response> {

        const getAccountService = new GetAccountService(accountsRepository, usersRepository);

        try {

            const account = await getAccountService.execute({username: req.body.username});

            console.log("Saldo solicitado por", req.body.username);
            console.log("Conta:", account);
            console.log("\n");

            return res.status(200).send({
                message: 'Conta buscada com sucesso.',
                account: account
            });

        } catch (err: unknown) {

            const error = err as Error;
            
            if(error.message)
                return res.status(202).send({
                    message: error.message,
                    account: null
                });
            
            else 
                return res.status(502).send({
                    message: 'Erro inesperado pelo servidor.',
                    account: null
                });

        }
    }

}