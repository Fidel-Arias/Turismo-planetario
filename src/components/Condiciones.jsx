import "../styles/Condiciones.css"
import { Link } from "react-router-dom";

function Condiciones(){
    return(
        <div className="contenido-body_condicion">
            <h1 className="titulo_condicion">CONDICIONES DEL ESPACIO:</h1>
            <p className="texto_condicion">En el espacio, no hay atmósfera significativa para proporcionar oxígeno ni para filtrar la radiación solar dañina.Asi que necesitaras equipos especiales, como trajes espaciales, para poder sobrevivir.</p>
            <div className="rectangulo_condicion"></div>
            <Link className="boton-flecha-condicion" to="/juego">
            <img className="flecha_condicion" src="/img/flecha_derecha.png" alt="Flecha" />
            </Link>
        </div>
    );
}

export{ Condiciones };