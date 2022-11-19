import { Router, Request, Response } from 'express';
import getAccountController from '../controllers/getAccount.controller';
import transferController from '../controllers/transfer.controller';
import getTransactionsController from '../controllers/getTransactions.controller';
import { authenticate } from '../auth';

const accountRouter = Router();

accountRouter.get('/getAccount', authenticate, (req: Request, res: Response) => {
    return getAccountController.handle(req, res);
});

accountRouter.post('/transfer', authenticate, (req: Request, res: Response) => {
    return transferController.handle(req, res);
});

accountRouter.get('/getTransactions', authenticate, (req: Request, res: Response) => {
    return getTransactionsController.handle(req, res);
});

export default accountRouter;
