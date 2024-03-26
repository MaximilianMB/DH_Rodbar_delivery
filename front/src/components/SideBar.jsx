import React from 'react'
import { Link } from 'react-router-dom'

export const SideBar = () => {
    return (
        <div>


            <ul>
                {/* <!-- Sidebar - Brand --> */}
                <Link to="/">
                    <div>
                        <img style={{ width: "100%" }} src="/images/logo-DH.png" alt="Digital House" />
                    </div>
                </Link>

                {/* <!-- Divider --> */}
                <hr />

                {/* <!-- Nav Item - Dashboard --> */}
                <li>
                    <Link to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard - DH movies</span></Link>
                </li>

                {/* <!-- Divider --> */}
                <hr />

                {/* <!-- Heading --> */}
                <div>Actions</div>

                {/* <!-- Nav Item - Pages --> */}
                <li>
                    <Link to="/lastProduct">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Ultimo Producto Agregado</span>
                    </Link>
                </li>

                {/* <!-- Nav Item - Charts --> */}
                <li>
                    <Link to="/category">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Categorias</span></Link>
                </li>

                {/* <!-- Nav Item - Tables --> */}
                <li>
                    <Link to="/products">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Productos</span></Link>
                </li>

                {/* <!-- Divider --> */}
                <hr />
            </ul>
        </div>
    )
}
