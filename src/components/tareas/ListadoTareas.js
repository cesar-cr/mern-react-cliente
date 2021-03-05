import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoTareas = () => {

     // obtener el state de proyectos
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext; // extracion de datos

    // obtener el context tarea
    const tareasContext = useContext(tareaContext);
    const { tareasproyecto } = tareasContext;

    if (!proyecto) return <h2>No hay proyecto</h2>;

    const [proyectoActual] = proyecto;

    // eliminar proyecto
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id);
    }
    console.log(proyectoActual);

    return (
        <>
            <h2>Proyecto: { proyectoActual.nombre }</h2>   
            <ul className="listado-tareas">
                {tareasproyecto.length === 0 
                    ? (<li className="tarea"><p>No hay tareas</p></li>) 
                    :
                    tareasproyecto.map(tarea => (
                        <Tarea
                            key={tarea._id}
                            tarea={tarea} />
                    ))
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={ onClickEliminar }
                >Eliminar proyeto &times;</button>
        </>
    )
}

ListadoTareas.propTypes = {

}

export default ListadoTareas
