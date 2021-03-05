import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AlertaConext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = props => {

    // extraer los valores del context 
    const alertaConext = useContext(AlertaConext);
    const { alerta, mostrarAlerta } = alertaConext;
    // context de auth
    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    // en caso de que el usuario se haya autenticado 
    useEffect(() => {
        if (autenticado) {
            props.history.push('/proyectos');
        }

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
    }, [mensaje, autenticado, props.history]);

    const [usuario, guardarUsuario] = useState({
        nombre : '',
        email: '',
        password: '',
        confirmar: ''
    });

    const { nombre, email, password, confirmar } = usuario;

    // func que modifica valores en el useState
    const handleChange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }
    // func cuando el usuario da click en iniciar sesion
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validaciones no vacias
        if (nombre.trim() === '' || email.trim() === '' || password.trim() === '' || confirmar.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-err');
            return;
        }
        // password minimo 8 caracteres
        if (password.length < 8) {
            mostrarAlerta('La contraseña debe ser minimo de 8 caracteres', 'alerta-err');
            return;
        }

        if (password !== confirmar) {
            mostrarAlerta('Las contraseñas debe ser iguales', 'alerta-err');
            return;
        }
        // pasar lo al action
        registrarUsuario({
            nombre,
            email, 
            password
        })
    }

    return (
        <div className="form-usuario">
            
            <div className="contenedor-form sombra-dark">
                {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>):null}
                <h1>Obtener una cuenta</h1>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label forhtml="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu nombre"
                            onChange={handleChange}
                            value={nombre}
                        />
                    </div>
                    <div className="campo-form">
                        <label forhtml="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu email"
                            onChange={handleChange}
                            value={email}
                        />
                    </div>
                    <div className="campo-form">
                        <label forhtml="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu password"
                            autoComplete="off"
                            onChange={handleChange}
                            value={password}
                        />
                    </div>
                    <div className="campo-form">
                        <label forhtml="confirmar">Confirmar password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repite tu password"
                            autoComplete="off"
                            onChange={handleChange}
                            value={confirmar}
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrar me"
                        />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Iniciar sesión
                </Link>
            </div>
        </div>
    )
}

NuevaCuenta.propTypes = {

}

export default NuevaCuenta;
