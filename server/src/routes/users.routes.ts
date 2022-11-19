import { Router, Request, Response } from 'express';
import createUserController from '../controllers/createUser.controller';
import getUserController from '../controllers/getUser.controller';
import loginController from '../controllers/login.controller';
import { authenticate } from '../auth';

const userRouter = Router();

userRouter.post('/createUser', (req: Request, res: Response) => {
    return createUserController.handle(req, res);
});

userRouter.get('/getUser', authenticate, (req: Request, res: Response) => {
    return getUserController.handle(req, res);
});

userRouter.post('/login', (req: Request, res: Response) => {
    return loginController.handle(req, res);
});

export default userRouter;
