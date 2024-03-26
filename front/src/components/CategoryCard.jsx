import React from 'react'

export const CategoryCard = (props) => {
    return (
        <div className='tarjetitas'>
            <div className='carta'>
                <div>
                    {props.nombre}
                </div>
            </div>
        </div>
    )
}
