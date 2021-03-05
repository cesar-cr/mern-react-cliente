import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    // obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext; // extracion de datos

    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });
    const [error, guardarError] = useState(false);

    const { nombre } = proyecto;

    const handleChangeProyecto = (e) => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    };

    const handleOnSubmitProyecto = (e) => {
        e.preventDefault();
        console.log('envio de datos');

        // validar campos
        if (nombre.trim() === '') {
            mostrarError();
            return;
        }
        
        agregarProyecto(proyecto);
        guardarProyecto({
            nombre:''
        });

    }

    return (
        <>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={ () => mostrarFormulario() }
            >
                Nuevo proyecto
            </button>
            {formulario ? (
                <form
                    className="formulario-nuevo-proyecto"
                    onSubmit={handleOnSubmitProyecto}
                >
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre proyecto"
                        name="nombre"
                        onChange={handleChangeProyecto}
                        value={ nombre }
                    />
                    <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Agregar proyecto"
                    />
                </form>)
                :
                null
            }

            {
                errorformulario && <p className="mensaje error">El nombre es obligatorio</p>
            }
        </>
    )
}

NuevoProyecto.propTypes = {

}

export default NuevoProyecto
