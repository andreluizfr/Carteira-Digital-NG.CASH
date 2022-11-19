import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import usersRepository from '../repository/UsersRepository';
import accountsRepository from '../repository/AccountsRepository';

export default new class CreateUserController {

    async handle (req: Request, res: Response): Promise<Response> {

        const createUserService = new CreateUserService(usersRepository, accountsRepository);

        try {

            const {createdUser, createdAccount, accessToken} = await createUserService.execute({
                username: req.body.username, 
                password: req.body.password
            });
            
            console.log("Usuário criado:", createdUser);
            console.log("Conta criada:", createdAccount);
            console.log("\n");

            return res.status(201).send({
                message: 'Registro realizado com sucesso.',
                accessToken: accessToken
            });

        } catch (err: unknown) {

            const error = err as Error;
            
            if(error.message)
                return res.status(202).send({
                    message: error.message
                });
            
            else 
                return res.status(502).send({
                    message: 'Erro inesperado pelo servidor.'
                });

        }
    }

}