import { Request, Response } from 'express';
import GetTransactionsService from '../services/GetTransactionsService';

import transactionsRepository from '../repository/TransactionsRepository';
import accountsRepository from '../repository/AccountsRepository';
import usersRepository from '../repository/UsersRepository';

export default new class GetTransactionsController {

    async handle (req: Request, res: Response): Promise<Response> {

        const getTransactionsService = new GetTransactionsService(transactionsRepository, accountsRepository, usersRepository);

        try {

            const transactions = await getTransactionsService.execute(req.body.username);

            console.log("Transações solicitadas por", req.body.username);
            console.log("\n");

            return res.status(200).send({
                message: 'Transações buscadas com sucesso.',
                transactions: transactions
            });

        } catch (err: unknown) {

            const error = err as Error;
            
            if(error.message)
                return res.status(202).send({
                    message: error.message,
                    transactions: null
                });
            
            else 
                return res.status(502).send({
                    message: 'Erro inesperado pelo servidor.',
                    transactions: null
                });

        }
    }

}