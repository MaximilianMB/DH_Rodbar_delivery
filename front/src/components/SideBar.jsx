import React from 'react'
import { Link } from 'react-router-dom'

export const SideBar = () => {
    return (
        <div>
            <ul>
                <Link to="/">
                    <div>
                        <img style={{ width: "100%" }} src="/img/Foto de perfil.png" alt="Digital House" />
                    </div>
                </Link>
                <hr />
                <li>
                    <Link to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard - RodBar-Delivery</span></Link>
                </li>
                <hr />
                <div>Actions</div>
                <li>
                    <Link to="/lastProduct">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Ultimo Producto Agregado</span>
                    </Link>
                </li>
                <li>
                    <Link to="/category">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Categorias</span></Link>
                </li>
                <li>
                    <Link to="/products">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Productos</span></Link>
                </li>
                <li>
                    <Link to="/users">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Lista de Usuarios</span></Link>
                </li>
                <hr />
            </ul>
        </div>
    )
}
