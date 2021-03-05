import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({ tarea }) => {


    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext; 

    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual} = tareasContext;
    
    // extraer los datos
    const [proyectoActual] = proyecto;

    // funcion que se ejcuta cuando el usuario presiona el btn de eliminar tarea
    const quitarTarea = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual.id);
    }

    // funcion que modifica el estado de la tarea
    const cambiaEstado = tarea => {
        if (tarea.estado) {
            tarea.estado = false;
        } else {
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    }

    // agregar tarea actual cuando se quiera editar
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return (
        <li className="tarea sombra">
            <p>
                {tarea.nombre}
            </p>
            <div className="estado">
                {tarea.estado
                    ?
                        (
                        <button
                            type="button"
                            className="completo"
                            onClick={ () => cambiaEstado(tarea)}
                            >Completo</button>
                        )
                    :
                        (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={ () => cambiaEstado(tarea)}
                            >Incompleto</button>
                        ) 
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={ () => quitarTarea(tarea._id) }
                >Eliminar</button>
            </div>
        </li>
    )
}

Tarea.propTypes = {

}

export default Tarea
