import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../../context/autenticacion/authContext';

const Barra = () => {

    // extraer la informacion autenticada
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

    useEffect(() => {
        usuarioAutenticado();
    }, []);

    return (
        <header className="app-header">
            {usuario && <p className="nombre-usuario">Hola <span>{usuario.nombre}</span> </p> }
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={ () => cerrarSesion() }
                >
                    Cerrar sesión
                </button>
            </nav>
        </header>
    )
}

Barra.propTypes = {

}

export default Barra
