import React, { useEffect, useState } from 'react';

export const LastProduct = () => {
    const [productList, setProductList] = useState([]);
    const [lastProd, setLastProd] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3001/api/products")
            .then(response => response.json())
            .then(data => {
                setProductList(data.products);
                if (data.products.length > 0) {
                    const last = data.products.length - 1;
                    setLastProd({
                        nombre: data.products[last].nombre,
                        ingredientes: data.products[last].ingredientes,
                        imagen: "/img/ultimoPro.jpg"
                    });
                }
            })
            .catch((e) => console.log(e));
    }, []);

    return (
        <div className='tarjeta-ultimo-producto'>
            {lastProd && (
                <div className='card-ultimo-producto-1'>
                    <div className='titulo-ultimo-producto'>
                        <h3>Ultimo Producto Agregado: {lastProd.nombre}</h3>
                    </div>
                    <div>
                        <div className='card-ultimo-producto-2'>
                            <img src={lastProd.imagen} alt="Producto Agregado" />
                        </div>
                        <div className='card-ultimo-producto-3'>
                            <p><h4>Ingredientes: </h4> {lastProd.ingredientes}</p>
                            <a target="_blank" rel="nofollow" href="/lastProduct">Ver detalles de producto</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
