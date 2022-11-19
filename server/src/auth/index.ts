import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface IjwtPayload {
    username: string
    expiresIn: string;
}

export function createAccessToken (username: string) {

    const accessToken = jwt.sign({ username: username }, 'NGCASHSECRET', {
        expiresIn: 86400000// expira em 24 horas
    });

    return accessToken;
}

export function authenticate (req : Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(403).send({message: 'Nenhum token encontrado.'});

    const [ , accessToken] = authHeader.split(" ");

    try {

        const jwtPayload = jwt.verify(accessToken, 'NGCASHSECRET') as IjwtPayload;
        
        //repassando essas informaçoes pelo req pra rota solicitada
        req.body.username = jwtPayload.username;
        next();

    } catch (err: unknown) {
        
        const error = err as Error;
        if(error.name === 'TokenExpiredError') {

            return res.status(401).send({
                message: 'Token expirado.'
            });

        } else {

            return res.status(403).send({
                authMessage: 'Token inválido, tente logar novamente.'
            });

        }
    
    }

}