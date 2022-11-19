import './styles.css';
import FloatingContainer from '../../Components/FloatingContainer';
import Header from '../../Components/Header';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const apiURL = "http://localhost:5353";

export default function SignupPage  () : JSX.Element {

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

    const enableSignupButton = useCallback(()=>{

        const passwordExp : RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$&*]{8,}$/;

        if( username.length>=3 && passwordExp.test(password)){
            const el = document.getElementsByClassName("SignupButton");
            if(el.length>0)
                el[0].removeAttribute("disabled");
            
        } else {
            const el = document.getElementsByClassName("SignupButton");
            if(el.length>0)
                el[0].setAttribute("disabled", "true");
        }

    }, [username, password]);

    useEffect(()=>{
        enableSignupButton();
    }, [enableSignupButton]);

    function signup (event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        axios.post(apiURL+"/user/createUser", {username: username, password: password}).then(response=>{

            setServerResponse(response.data.message);

            const el = document.getElementsByClassName("Server-response");
            el[0].classList.remove("Hidden");

            if(response.data.accessToken){
                localStorage.setItem('x-access-token', response.data.accessToken);
                window.location.reload();
            }

        }).catch(error=>{
            console.error(error);
        });

    }

    return (
        <div className='SignupPage'>
            <Header user={null} setUser={null}/>

            <FloatingContainer>
                <form onSubmit={signup}>
                    <div className='Signup-container'>

                        <div className='Signup-container-title'>
                            Registrar-se na NG.CASH
                        </div> 

                        <div className='Styled-input Username'>
                            <input
                                type="text"
                                minLength={3}
                                required={true}
                                onChange={handleUsernameChange}
                                onBlur={handleBlur}
                            />
                            <span>Nome de usuário</span>
                            <p>O nome de usuário precisa ter pelo menos 3 caracteres.</p>
                        </div>

                        <div className='Styled-input Password'>
                            <input
                                type="password"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$&*]{8,}"
                                required={true}
                                onChange={handlePasswordChange}
                                onBlur={handleBlur}
                            />
                            <span>Senha</span>
                            <p>Precisa ter pelo menos 8 caracteres, uma letra maiúscula e um número.</p>
                        </div>

                        <button 
                            className='SignupButton' 
                            type="submit" 
                            disabled
                        >
                            Cadastrar-se
                        </button>

                        <a href='http://localhost:3000/login' className='LoginLink'>
                            Entrar
                        </a>

                        <span className='Server-response Hidden'>{serverResponse}</span>

                    </div>
                </form>
            </FloatingContainer>
        </div>
    );
}