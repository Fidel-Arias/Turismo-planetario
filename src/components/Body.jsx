import "../styles/Body.css"
import { Link, useNavigate } from "react-router-dom";

function Body(){
    return(
        <div className="contenido-body_body">
            <h1 className ="TituloBody ">Space in one click</h1>
            <h3 className="texto_body">Embárcate en un viaje cósmico, descubre la majestuosidad de universos lejanos y traza tu propio camino entre las estrellas. ¡El cosmos te espera!</h3>
            <Link to="/login" className="btnfos empezar">Empezar</Link>
        </div>
    );
}

export { Body };