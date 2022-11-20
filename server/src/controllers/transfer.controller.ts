import { Request, Response } from 'express';
import TransferService from '../services/TransferService';
import accountsRepository from '../repository/AccountsRepository';
import usersRepository from '../repository/UsersRepository';
import transactionsRepository from '../repository/TransactionsRepository';

export default new class GetBalanceController {

    async handle (req: Request, res: Response): Promise<Response> {

        const transferService = new TransferService(accountsRepository, usersRepository, transactionsRepository);

        try {
            const creditedUsername = req.body.username;
            const debitedUsername = req.body.debitedUsername;
            const value = req.body.value;

            const { createdTransaction } = await transferService.execute({
                creditedUsername: creditedUsername,
                debitedUsername: debitedUsername,
                value: value
            });

            console.log("Operação de transferência de", creditedUsername, "para", debitedUsername, "no valor de", value);
            console.log(createdTransaction);
            console.log("\n");

            return res.status(201).send({
                message: 'Transação realizada com sucesso.',
                createdTransaction: createdTransaction
            });

        } catch (err: unknown) {

            const error = err as Error;
            
            if(error.message){

                console.log("Operação de transferência de", req.body.username, "para", req.body.cashInUsername, "no valor de", req.body.value);
                console.error(error.message);

                return res.status(202).send({
                    message: error.message,
                });

            } else {

                console.log("Operação de transferência de", req.body.username, "para", req.body.cashInUsername, "no valor de", req.body.value);
                
                return res.status(502).send({
                    message: 'Erro inesperado pelo servidor.',
                });
            
            }
            
        }
    }

}