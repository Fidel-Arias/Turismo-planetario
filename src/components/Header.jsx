import "../styles/Header.css"
import { Link } from "react-router-dom";

function Header(){
    return(
        
        <div className="contenedor-header">
            <header className="header">
                <div className = "logo">
                    <Link to="/">
                    <img src="/img/logo.png" alt="logo de la pagina"/>
                    </Link>
                </div>
                <nav>
                    <ul className="nav-links">
                        <li><a href="#">Satélites</a></li>
                        <li><a href="#">Planetas</a></li>
                    </ul>
                </nav>
                <Link to="/login" className="btn"><button>Iniciar Sesion</button></Link>
            </header>
        </div>
    );
}

export { Header };