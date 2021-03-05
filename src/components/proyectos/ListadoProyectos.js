import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';

const ListadoProyectos = () => {

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    // extraer proyectos de state incial
    const proyectosContext = useContext(proyectoContext);
    const { mensaje, proyectos, obtenerProyectos } = proyectosContext; // extracion de datos

    // obtener proyectos cuando carga el componente
    useEffect(() => {
        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

        obtenerProyectos();

    }, [mensaje]);

    // revisar si proyectos tiene contenido
    if (proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>;

    return (
        <ul className="listado-proyectos">
            { alerta && (<div className={`alerta ${alerta.msg}`}>{alerta.msg}</div>)}
            { proyectos.map(proyecto => (
                <Proyecto
                    key={proyecto._id}
                    proyecto={proyecto} />
            ))}
        </ul>
    )
}

ListadoProyectos.propTypes = {

}

export default ListadoProyectos
