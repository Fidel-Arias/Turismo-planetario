import "../styles/SeleccionPlaneta.css"
import { Link } from "react-router-dom";

function SeleccionPlaneta(){
    return(
        <div className="contenido-body_SeleccionPlaneta">
            <div className="rectangulo_seleccion"></div>
            <div className="contenido_Planetas">
                <h1 className="texto_seleccion">¡ES HORA DE PARTIR! <br />SELECCIONA TU DESTINO</h1>
                <a className="imagenSol">
                    <img className="sol" src="/img/sol.png" alt="Sol" />
                </a>  
                <Link className="boton-jupiter" to="/itinerario">
                    <img className="jupiter" src="/img/jupiter.png" alt="Jupiter" />
                </Link>
                <Link className="boton-marte" to="/itinerario">
                    <img className="marte" src="/img/marte.png" alt="Marte" />
                </Link>  
                <Link className="boton-venus" to="/itinerario">
                    <img className="venus" src="/img/venus.png" alt="Venus" />
                </Link>
                <Link className="boton-urano" to="/itinerario">
                    <img className="urano" src="/img/urano.png" alt="Urano" />
                </Link>  
                <Link className="boton-saturno" to="/itinerario">
                    <img className="saturno" src="/img/saturno.png" alt="Saturno" />
                </Link>  
                <Link className="boton-mercurio" to="/itinerario">
                    <img className="mercurio" src="/img/mercurio.png" alt="Mercurio" />
                </Link> 
                <Link  className="boton-neptuno" to="/itinerario">
                    <img className="neptuno" src="/img/neptuno.png" alt="Neptuno" />
                </Link>
            </div> 
    </div>
    );
}

export { SeleccionPlaneta };