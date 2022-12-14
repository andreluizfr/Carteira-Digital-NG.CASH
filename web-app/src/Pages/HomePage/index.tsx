import './styles.css';
import Header from '../../Components/Header';
import FloatingContainer from '../../Components/FloatingContainer';
import { FaRegWindowClose } from 'react-icons/fa';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface IUser {
	username: string,
	password: string
}

interface IHomePageProps {
    user: IUser | null,
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

interface IAccount {
    id: string,
    balance: number
}

interface ITransaction {
    debitedUsername: string,
    creditedUsername: string,
    value: number,
    createdAt: Date
}

const apiURL = "http://localhost:5353";

export default function HomePage ({user, setUser}:IHomePageProps) : JSX.Element {

    const accessToken = localStorage.getItem('x-access-token');

    const [account, setAccount] = useState<IAccount | null>(null);

    const [transactions, setTransactions] = useState<ITransaction[] | null>(null);
    const [dateFilter, setDateFilter] = useState("0");
    const [typeFilter, setTypeFilter] = useState("0");

    const [username, setUsername] = useState("");
    const [amount, setAmount] = useState(0);
    const [serverResponse, setServerResponse] = useState("");

    const fetchAccount = useCallback(()=>{

        if(accessToken){

            axios.get(apiURL+"/account/getAccount", {headers: { Authorization: `Bearer ${accessToken}` }}).then(response=>{

				console.log(response.data.message);
				setAccount(response.data.account);
				
			}).catch(error=>{
				console.error(error);
			});

        }

    }, [accessToken]);

    const fetchTransactions = useCallback(()=>{

        if(accessToken){

            axios.get(apiURL+"/account/getTransactions?dateFilter="+dateFilter+"&&typeFilter="+typeFilter,
                {
                    headers: { Authorization: `Bearer ${accessToken}` }
                },
            ).then(response=>{

				console.log(response.data.message);
				setTransactions(response.data.transactions);
                console.log(response.data.transactions);
				
			}).catch(error=>{
				console.error(error);
			});

        }

    }, [accessToken, dateFilter, typeFilter]);

    useEffect(()=>{
        fetchAccount();
    }, [fetchAccount]);

    useEffect(()=>{
        fetchTransactions();
    }, [fetchTransactions]);

    function filterTransactionsByDate (event: React.ChangeEvent<HTMLSelectElement>) {
        const value = event.target.value;
        setDateFilter(value);
    }

    function filterTransactionsByType (event: React.ChangeEvent<HTMLSelectElement>) {
        const value = event.target.value;
        setTypeFilter(value);
    }

    function showMakeTransferContainer () {
        const els = document.getElementsByClassName("Floating-container");
        const el = els[0] as HTMLElement;
        el?.classList.remove("Hidden");
    }

    function hideMakeTransferContainer () {
        const els = document.getElementsByClassName("Floating-container");
        const el = els[0] as HTMLElement;
        el?.classList.add("Hidden");
    }

    function handleBlur (event: React.FocusEvent<HTMLInputElement>) {
        const el = (event.target as HTMLInputElement);
        el.setAttribute('wasFocused', 'true');
    }

    function handleAmountChange (event: React.ChangeEvent<HTMLInputElement>) {
        const value = (event.target as HTMLInputElement).value;
        setAmount(Number(value));
    }

    function handleUsernameChange (event: React.ChangeEvent<HTMLInputElement>) {
        const value = (event.target as HTMLInputElement).value;
        setUsername(value);
    }

    const enableTransferButton = useCallback(()=>{

        if(account){

            if( (username.length >= 3) && (amount > 0) && (amount < account.balance) ){
                const el = document.getElementsByClassName("TransferButton");
                if(el.length>0)
                    el[0].removeAttribute("disabled");
                
            } else {
                const el = document.getElementsByClassName("TransferButton");
                if(el.length>0)
                    el[0].setAttribute("disabled", "true");
            }

        }

    }, [username, amount, account]);

    useEffect(()=>{
        enableTransferButton();
    }, [enableTransferButton]);

    function makeTransfer (event: React.FormEvent<HTMLFormElement>) {
        
        event.preventDefault();

        if(username && amount){

            axios.put(apiURL+"/account/transfer", 
                {
                    debitedUsername: username,
                    value: amount
                }, 
                {
                    headers: { 
                        Authorization: `Bearer ${accessToken}` 
                    }
                }
            ).then(response=>{

                setServerResponse(response.data.message);
                const el = document.getElementsByClassName("Server-response");
                el[0].classList.remove("Hidden");

                setTimeout(()=>{
                    window.location.reload();
                }, 1000);
                
            }).catch(error=>{
                console.error(error);
            });

        }

    }

    

    return (
        <div className="HomePage">

            <Header user={user} setUser={setUser}/>

            <main className="HomePage-container">

                <section className="Account-wrapper">

                    <div className="Account-balance-wrapper">
                        <div className="Account-balance-symbol">R$</div>
                        <div className="Account-balance-value">{account?.balance}</div>
                    </div>

                    <div className="Account-options">

                        <button className="Account-option-button" onClick={showMakeTransferContainer}>
                            transferir
                        </button>

                    </div>

                </section>

                <section className="Transactions-wrapper">

                    <div className="Transactions-bar">

                        <span className="Transactions-bar-options-title">A partir de quando</span>
                        <span className="Transactions-bar-options-title">Tipos de transa????o</span>

                        <select id="transactions-date-options" name='Data' onChange={filterTransactionsByDate}>
                            <option value="0">Desde sempre</option>
                            <option value="1">A partir desse ano</option>
                            <option value="2">A partir desse m??s</option>
                        </select>

                        <select id="transactions-type-options" name='Tipo de transa????o' onChange={filterTransactionsByType}>
                            <option value="0">Todos os tipos</option>
                            <option value="1">Cash-out</option>
                            <option value="2">Cash-in</option>
                        </select>

                    </div>

                    {(transactions?.length && user)?
                        <div className="Transactions-table">
                            {
                                transactions.map((transaction, index) => {

                                    let type;

                                    if (user.username === transaction.creditedUsername)
                                        type = "cash-out";
                                    
                                    else if (user.username === transaction.debitedUsername)
                                        type = "cash-in";
                                    
                                    const simplifiedDate = new Date(transaction.createdAt).toLocaleDateString();

                                    return(
                                        
                                        <div className="Transaction" data-type={type} key={index}>

                                            <div  className="Transaction-username">
                                                {(user.username === transaction.creditedUsername)?
                                                    transaction.debitedUsername
                                                    :
                                                    transaction.creditedUsername
                                                }
                                            </div>

                                            <div className="Transaction-infos">

                                                <div className="Transaction-date"> 
                                                    {simplifiedDate}
                                                </div>

                                                <div className="Transaction-value">
                                                    {(type=== "cash-out")?<>-</>:<>+</>} R${transaction.value}
                                                </div>

                                            </div>

                                        </div>
                                        
                                    );
                                })
                            }
                        </div>
                        :
                        <div className="Transactions-table">
                            <span>N??o h?? transa????es registradas.</span>
                        </div>
                    }

                </section>

            </main>

            <FloatingContainer className='Hidden'>

                <form onSubmit={makeTransfer}>
                    <div className='MakeTransfer-container'>

                        <div className='Hide-button-container'>
                            <FaRegWindowClose className='Hide-button' onClick={hideMakeTransferContainer}/>
                        </div>

                        <div className='Your-balance-container'>
                            <div className='Your-balance'>
                                Seu saldo ?? de R$ {account?.balance}
                            </div>
                        </div>

                        <div className='Styled-input UsernameToDebit'>
                            <input
                                type="text"
                                minLength={3}
                                required={true}
                                onChange={handleUsernameChange}
                                onBlur={handleBlur}
                            />
                            <span>Nome de usu??rio</span>
                            <p>O nome de usu??rio precisa ter pelo menos 3 caracteres.</p>
                        </div>

                        <div className='Styled-input AmountToCredit'>
                            <input
                                type="number"
                                step="0.01"
                                min="0.01"
                                required={true}
                                onChange={handleAmountChange}
                                onBlur={handleBlur}
                            />
                            <span>Quantia de dinheiro</span>
                            <p>Precisa conter um valor com no m??ximo 2 casas decimais.</p>
                        </div>

                        <button 
                            className='TransferButton' 
                            type="submit" 
                            disabled
                        >
                            Transferir
                        </button>

                        <span className='Server-response Hidden'>{serverResponse}</span>

                    </div>
                </form>

            </FloatingContainer>

        </div>
    );
}