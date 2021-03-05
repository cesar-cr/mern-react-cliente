import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({ proyecto }) => {
    
    // obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext; // extracion de datos

    // obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas} = tareasContext;

    // agregar una funcion de click
    const seleccionarProyecto = (id) => {
        proyectoActual(id); // para mostrar el proycto actual
        obtenerTareas(id); // obtiene las tareas por id
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={ () => seleccionarProyecto(proyecto._id) }
            >{proyecto.nombre}</button> 
        </li>
    )
}

Proyecto.propTypes = {

}

export default Proyecto
