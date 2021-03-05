import React, {useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {
     // obtener el context de proyectos para las func y datos
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext; 
    // obtener el context de tarea para func y datos
    const tareasContext = useContext(tareaContext);
        const { tareaseleccionada,  errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    // detecta si hay una tarea seleccionada
    useEffect(() => {
        if (tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada);
        } else {
            guardarTarea({
                nombre: ''
            });
        }
    }, [tareaseleccionada]);

    // generar useState
    const [tarea, guardarTarea] = useState({
        nombre: ''
    });
    const { nombre } = tarea;

    // obtener los datos

    if (!proyecto) return null;

    const [proyectoActual] = proyecto;

    // Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    // agregar una nueva tarea
    const onSubmit = (e) => {
        e.preventDefault();

        // validar
        if(nombre.trim() === '' ) {
            validarTarea();
            return;
        }

        // Si es edición o si es nueva tarea
        if(tareaseleccionada === null ) {
            // agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            // actualizar tarea existente
            actualizarTarea(tarea);

            // Elimina tareaseleccionada del state
            limpiarTarea();
        }
        // Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);

        // reiniciar el form
        guardarTarea({
            nombre: ''
        })
    }

    return (
        <div className="formulario">
            
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-principal btn-submit btn-block"
                        value={ tareaseleccionada ? 'Editar Tarea':'Agregar Tarea'}
                    />
                </div>
            </form>
            {errortarea && <p className="mensaje error">El nombre de la tarea es obligatorio</p>}
        </div>
    )
}

FormTarea.propTypes = {

}

export default FormTarea
