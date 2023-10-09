import "../styles/Planeta.css";

function Planeta(props){
    return(
        
        <div className="contenido-body imagen-fondo">
            <div className="rectangulo"></div>
            <div className="contenedor__comple">
                <div className="titulo">{props.titulo}</div>
                <div className="img-texto">
                    <img className="imagenPlaneta" src={props.imagen} alt={props.titulo} />
                    <p className="texto">
                        {props.texto}
                    </p>
                </div>
                <a className="boton-flecha" href="#">
                    <img className="flecha" src="/img/flecha.png" alt="Flecha" />
                </a>   

            </div>
        </div>
    );
}
export{ Planeta };