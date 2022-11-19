import { AppDataSource } from './database/postgres';
import express, { Request, Response, NextFunction} from 'express';
import cors from 'cors';
import userRouter from './routes/users.routes';
import accountRouter from './routes/accounts.routes';



const PORT = 5353;
const app = express();



//setting basic express settings
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());



//routes
app.use('/user', userRouter);
app.use('/account', accountRouter);



//error handler
app.use( (err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({ error: err.message });
});




//connecting with postgres 
AppDataSource.initialize().then(() => {

    console.log("Connection with DB stablished.");
    
    //starting http server
    app.listen(PORT, () => console.log('Server started on port: ' + PORT + '\n'));

}).catch((error) => console.log(error));

