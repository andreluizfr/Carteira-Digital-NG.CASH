import './styles.css';
import logo from '../../Assets/Imgs/logo.png';

interface IUser {
	username: string,
	password: string
}

interface IHeaderProps {
    user: IUser | null,
    setUser: React.Dispatch<React.SetStateAction<IUser | null>> | null
}

export default function Header ({user, setUser}:IHeaderProps) : JSX.Element {

    function navigateToHomePage () {
        window.location.href= "http://localhost:3000/";
    }

    function navigateToLoginPage () {
        window.location.href = "http://localhost:3000/login";
    }

    function navigateToSignupPage () {
        window.location.href = "http://localhost:3000/signup";
    }

    function logout () {
        if(user && setUser){
            setUser(null);
            localStorage.clear();
        }
    }

    if(user)
        return(
            
            <header className="Header">

                <img 
                    className="Header-icon" 
                    src={logo} 
                    alt='logo'
                    onClick={navigateToHomePage}
                />

                <span className="Header-username">
                    @{user?.username}
                </span>

                <span className="Header-logout" onClick={logout}>
                    sair
                </span>
                
            </header>
        );

    else
        return(

            <header className="Header">

                <img 
                    className="Header-icon" 
                    src={logo} 
                    alt='logo'
                    onClick={navigateToHomePage}
                />

                <div className='Login-signup-container'>
                    <button className='Button' onClick={navigateToLoginPage}>
                        Entrar
                    </button>

                    <button className='Button' onClick={navigateToSignupPage}>
                        Registrar-se
                    </button>
                </div>
                
            </header>

        );
}