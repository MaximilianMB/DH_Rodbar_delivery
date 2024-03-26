import React from 'react'

export const ProductCard = (props) => {
    return (
        <table style={{ border: " 1px solid black", width: "100%", margin: "auto" }}>
            {props.showHeader &&(
            <tr>
                <th style={{ border: " 1px solid black", width: "20%", margin: "auto", textAlign: "center" }}>Id</th>
                <th style={{ border: " 1px solid black", width: "20%", margin: "auto", textAlign: "center" }}>Nombre</th>
                <th style={{ border: " 1px solid black", width: "20%", margin: "auto", textAlign: "center" }}>Ingredientes</th>
                <th style={{ border: " 1px solid black", width: "20%", margin: "auto", textAlign: "center" }}>Precio</th>
            </tr>
            )}
            <tr>
                <td style={{ border: " 1px solid black", width: "20%", margin: "auto", textAlign: "center" }}>{props.id}</td>
                <td style={{ border: " 1px solid black", width: "20%", margin: "auto", textAlign: "center" }}>{props.nombre}</td>
                <td style={{ border: " 1px solid black", width: "20%", margin: "auto", textAlign: "center" }}>{props.ingredientes}</td>
                <td style={{ border: " 1px solid black", width: "20%", margin: "auto", textAlign: "center" }}>{props.precio}</td>
            </tr>
        </table>
    )
}
