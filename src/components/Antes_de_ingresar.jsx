import "../styles/Antes_de_ingresar.css"
import { Link } from "react-router-dom";

function Antes_de_ingresar(){
    return(
        <div className="contenido-body_antes">
            <h1 className="titulo_Antes_de_ingresar">¿ES TU PRIMER VIAJE ESPACIAL?</h1>
            <div className="rectangulo_Antes_de_ingresar"></div>
            <div className="group-20 group">
            <Link to="/SeleccionDePlaneta">
                <button className="overlap-group1">
                    <div className="si nicomoji-regular-normal-white-59-3px">SI</div>
                </button>
            </Link>
            </div>
            <div className="group-21 group">
                <Link to="/tutorial">
                    <button className="overlap-group2">
                        <div className="si nicomoji-regular-normal-white-59-3px">NO</div>
                    </button>
                </Link>
            </div>
        </div>
    );
}
export { Antes_de_ingresar };