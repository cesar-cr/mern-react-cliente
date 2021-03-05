import React, { useReducer } from 'react';
import alertaReducer from './alertaReducer';
import alertaConext from './alertaContext';
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types/index';

const AlertaState = props => {
    const initialState = {
        alerta: null
    }

    const [state, dispatch] = useReducer(alertaReducer, initialState);

    // funciones 
    const mostrarAlerta = (msg, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        });

        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 5000);
    }

    return (
        <alertaConext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta,
                info:''
            }}
        >
            {props.children}
        </alertaConext.Provider>
    )
}

export default AlertaState;