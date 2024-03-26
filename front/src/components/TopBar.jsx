import React from 'react'
import { CardTop } from './CardTop'
import { useEffect, useState } from 'react'

export const TopBar = () => {

    const [productList, setProductList] = useState({ cifra: 0 })
    const [userList, setUserList] = useState({ cifra: 0 })
    const [categoryList, setCategoryList] = useState({ cifra: 0 })


    console.log(productList)


    useEffect(() => {
        fetch("http://localhost:3001/api/products")
            .then(response => response.json())
            .then(data => setProductList(data.count))
            .catch((e) => console.log(e))

        fetch("http://localhost:3001/api/users")
            .then(response => response.json())
            .then(data => setUserList(data.count))
            .catch((e) => console.log(e))

        fetch("http://localhost:3001/api/categories")
            .then(response => response.json())
            .then(data => setCategoryList(data.count))
            .catch((e) => console.log(e))
    }, [])


    let cardProduct = {
        titulo: "Productos en la base de datos",
        colorBorde: "primary",
        cifra: productList.total,
        icono: "fa-film"
    }

    let cardUser = {
        titulo: "Usuarios en la base de datos",
        colorBorde: "primary",
        cifra: userList.total,
        icono: "fa-film"
    }

    let cardCategory = {
        titulo: "Categorias en la base de datos",
        colorBorde: "primary",
        cifra: categoryList.total,
        icono: "fa-film"
    }

    console.log(cardProduct.cifra)
    console.log(cardUser.cifra);
    console.log(cardCategory.cifra);

    return (
        <div className='topBar'>
            <div className='titulo-dash'>
                <h2>App Dashboard</h2>
            </div>
            <div className='cartas-info'>
                <div className='carta-1'>
                    <CardTop titulo={cardProduct.titulo} colorBorde={cardProduct.colorBorde} cifra={cardProduct.cifra} icono={cardProduct.icono} />
                </div>
                <div className='carta-2'>
                    <CardTop titulo={cardUser.titulo} colorBorde={cardUser.colorBorde} cifra={cardUser.cifra} icono={cardUser.icono} />
                </div>
                <div className='carta-3'>
                    <CardTop titulo={cardCategory.titulo} colorBorde={cardCategory.colorBorde} cifra={cardCategory.cifra} icono={cardCategory.icono} />
                </div>
            </div>
        </div>
    )
}
