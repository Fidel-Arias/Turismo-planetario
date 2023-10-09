import "../styles/Tutorial.css"
import { Link, useNavigate } from "react-router-dom";

function Tutorial(){
    return(
        <div className="contenido-body_tutorial">
            <h1 className="titulo_tutorial">Empezar tutorial</h1>
            <div className="rectangulo_tutorial"></div>
            <Link className="boton-flecha-tutorial" to="/condiciones">
                <img className="flecha_tutorial" src="/img/flecha_derecha.png" alt="Flecha" />
            </Link>
        </div>
    );
}
export { Tutorial };