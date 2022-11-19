import './styles.css';
import FloatingContainer from '../../Components/FloatingContainer';
import Header from '../../Components/Header';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const apiURL = "http://localhost:5353";

export default function LoginPage  () : JSX.Element {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [serverResponse, setServerResponse] = useState("");

    const accessToken = localStorage.getItem('x-access-token');

    if(accessToken)
        window.location.href = "http://localhost:3000/";

    function handleUsernameChange (event: React.ChangeEvent<HTMLInputElement>) {
        const value = (event.target as HTMLInputElement).value;
        setUsername(value);
    }

    function handlePasswordChange (event: React.ChangeEvent<HTMLInputElement>) {
        const value = (event.target as HTMLInputElement).value;
        setPassword(value);
    }

    function handleBlur (event: React.FocusEvent<HTMLInputElement>) {
        const el = (event.target as HTMLInputElement);
        el.setAttribute('wasFocused', 'true');
    }

    const enableLoginButton = useCallback(()=>{

        if( username && password){
            const el = document.getElementsByClassName("LoginButton");
            if(el.length>0)
                el[0].removeAttribute("disabled");
            
        } else {
            const el = document.getElementsByClassName("LoginButton");
            if(el.length>0)
                el[0].setAttribute("disabled", "true");
        }

    }, [username, password]);

    useEffect(()=>{
        enableLoginButton();
    }, [enableLoginButton]);

    function login (event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        axios.post(apiURL+"/user/login", {username: username, password: password}).then(response=>{

            setServerResponse(response.data.message);

            const el = document.getElementsByClassName("Server-response");
            el[0].classList.remove("Hidden");

            if(response.data.accessToken){
                localStorage.setItem("x-access-token", response.data.accessToken);
                window.location.reload();
            }

        }).catch(error=>{
            console.error(error);
        });

    }

    return (
        <div className='LoginPage'>
            <Header user={null} setUser={null}/>
            
            <FloatingContainer>
                <form onSubmit={login}>
                    <div className='Login-container'>

                        <div className='Login-container-title'>
                            Entrar na NG.CASH
                        </div> 

                        <div className='Styled-input Username'>
                            <input
                                type="text"
                                required={true}
                                onChange={handleUsernameChange}
                                onBlur={handleBlur}
                            />
                            <span>Nome de usuário</span>
                        </div>

                        <div className='Styled-input Password'>
                            <input
                                type="password"
                                required={true}
                                onChange={handlePasswordChange}
                                onBlur={handleBlur}
                            />
                            <span>Senha</span>
                        </div>

                        <button 
                            className='LoginButton' 
                            type="submit" 
                            disabled
                        >
                            Entrar
                        </button>

                        <a href='http://localhost:3000/signup' className='SignupLink'>
                            Cadastrar-se
                        </a>

                        <span className='Server-response Hidden'>{serverResponse}</span>

                    </div>
                </form>
            </FloatingContainer>
        </div>
    );
}