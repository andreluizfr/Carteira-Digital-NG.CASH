import IUsersRepository from "../repository/IUsersRepository";
import { createAccessToken } from "../auth";
import * as bcrypt from 'bcrypt';

interface ILoginRequestDTO{
    username: string,
    password: string
}

export default class LoginService{

    //depende da interface do repositório mas não da implementação em si
    constructor (private usersRepository: IUsersRepository){}

    async execute(data: ILoginRequestDTO) {

        const user = await this.usersRepository.findByUsername(data.username);

        //usuário encontrado e com senha correta
        if(user) {

            const isMatch = await bcrypt.compare(data.password, user.password);

            if(isMatch){
                //cria token de acesso e o retorna
                const accessToken = createAccessToken(user.username);

                return accessToken;

            } else throw new Error("Usuário ou senha incorretos.");

        } else throw new Error("Usuário ou senha incorretos.");

    }

}