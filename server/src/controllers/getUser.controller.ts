import { Request, Response } from 'express';
import GetUserService from '../services/GetUserService';
import usersRepository from '../repository/UsersRepository';

export default new class GetUserController {

    async handle (req: Request, res: Response): Promise<Response> {

        const getUserService = new GetUserService(usersRepository);

        try {

            const user = await getUserService.execute({username: req.body.username});

            console.log("Informações do usuário solicitado por:", user.username);
            console.log(user);
            console.log("\n");

            return res.status(200).send({
                message: 'Usuário encontrado.',
                user: {
                    username: user.username,
                    password: user.password
                }
            });

        } catch (err: unknown) {

            const error = err as Error;
            
            if(error.message)
                return res.status(202).send({
                    message: error.message,
                    user: null
                });
            
            else 
                return res.status(502).send({
                    message: 'Erro inesperado pelo servidor.',
                    user: null
                });

        }
    }

}