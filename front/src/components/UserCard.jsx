import React from 'react'

export const UserCard = (props) => {
    
        let rol
        if(props.rol === 1){
        rol = "Administrador"
    }else if(props.rol === 2){
        rol = "Analista"
    }else{
        rol = "Huesped"
    }


    return (
        <table style={{ border: " 1px solid black", width: "100%", margin: "auto" }}>
            {props.showHeader &&(
            <tr>
                <th style={{ border: " 1px solid black", width: "20%", margin: "auto", textAlign: "center" }}>Id</th>
                <th style={{ border: " 1px solid black", width: "20%", margin: "auto", textAlign: "center" }}>Nombre</th>
                <th style={{ border: " 1px solid black", width: "20%", margin: "auto", textAlign: "center" }}>Email</th>
                <th style={{ border: " 1px solid black", width: "20%", margin: "auto", textAlign: "center" }}>Rol</th>
            </tr>
            )}
            <tr>
                <td style={{ border: " 1px solid black", width: "20%", margin: "auto", textAlign: "center" }}>{props.id}</td>
                <td style={{ border: " 1px solid black", width: "20%", margin: "auto", textAlign: "center" }}>{props.nombre}</td>
                <td style={{ border: " 1px solid black", width: "20%", margin: "auto", textAlign: "center" }}>{props.email}</td>
                <td style={{ border: " 1px solid black", width: "20%", margin: "auto", textAlign: "center" }}>{rol}</td>
            </tr>
        </table>
    )
}
