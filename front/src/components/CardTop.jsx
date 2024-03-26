import React from 'react'
import { IoFastFood } from "react-icons/io5";

export const CardTop = (props) => {
    return (
        <div className='tarjeta'>
            <div className="primera">
                <div className="card-body">
                    <div className="primera-1">
                        <div className="col2">
                            <div className='text-tarjeta'>{props.titulo}</div>
                            <div className="cifra-tarjeta">{props.cifra}</div>
                        </div>
                        <div className="icono-tarjeta">
                            <i className="icono"><IoFastFood /></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}