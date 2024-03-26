import React from 'react'

export const LastProduct = (props) => {
    return (
        <div>
            <div>
                <div>
                    <h5>Ultimo Producto Agregado</h5>
                </div>
                <div>
                    <div>
                        <img style={{ width: "40rem" }} src={props.imagen} alt="Producto Agregado" />
                    </div>
                    <p>{props.ingredientes}</p>
                    <a target="_blank" rel="nofollow" href="/">Ver detalles de producto</a>
                </div>
            </div>
        </div>
    )
}
