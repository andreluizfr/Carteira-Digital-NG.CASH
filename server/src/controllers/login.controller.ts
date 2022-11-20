import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import usersRepository from '../repository/UsersRepository';

export default new class GetUserController {

    async handle (req: Request, res: Response): Promise<Response> {

        const loginService = new LoginService(usersRepository);

        try {

            const accessToken = await loginService.execute({
                username: req.body.username,
                password: req.body.password
            });

            console.log("Login realizado por", req.body.username);
            console.log("Access Token:", accessToken);
            console.log("\n");

            return res.status(200).send({
                message: 'Login realizado com sucesso.',
                accessToken: accessToken
            });

        } catch (err: unknown) {

            const error = err as Error;
            
            if(error.message)
                return res.status(202).send({
                    message: error.message,
                    accessToken: null
                });
            
            else 
                return res.status(502).send({
                    message: 'Erro inesperado pelo servidor.'
                });

        }
    }

}