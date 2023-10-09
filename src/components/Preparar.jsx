import "../styles/Preparar.css"
import { Link, useNavigate } from "react-router-dom";

function Preparar() {
    return (
        <div className="contenido-body_preparar">
            <p className="texto_preparar">¡Bienvenido al emocionante mundo del espacio! Prepárate para embarcarte en 
            una aventura intergaláctica que te llevará más allá de las estrellas y te sumergirá en un universo lleno 
            de misterios, maravillas y desafíos cósmicos.</p>
            <h1 className="titulo_preparar">¡PREPARATE PARA EL DESPEGUE!</h1>
            <div className="rectangulo_preparar"></div>
            <Link className="boton-flecha-preparar" to="/antes_de_ingresar">
                <img className="flecha_preparar" src="/img/flecha_derecha.png" alt="Flecha" />
            </Link>
        </div>
    );
}

export { Preparar };