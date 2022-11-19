import './styles.css';
import aplicativo from '../../Assets/Imgs/aplicativo.png';
import Header from '../../Components/Header';

export default function FirstPage  () : JSX.Element {
    
    return (
        <div className='FirstPage'>

            <Header user={null} setUser={null}/>

            <section className='First-section'>

                <div className='First-column'>
                    <p className='Title'>SOBRE</p>
                    <p className='NoWrap'>Somos a carteira digital da Nova Geração.</p>
                    <p className='NoWrap'>Viemos te ajudar a construir a sua independência financeira.</p>
                    <p className='NoWrap'>Vivemos o novo, transformando o futuro. Afinal, depois do ponto, vem um novo começo.</p>
                </div>

                <img className='Second-column' src={aplicativo} alt='aplicativo'/>
                
            </section>

            <section className='Second-section'>

            </section>

            <section className='Last-section'>

            </section>

        </div>
    );
}