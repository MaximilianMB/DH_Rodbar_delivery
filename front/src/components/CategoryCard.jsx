import React from 'react'

export const CategoryCard = (props) => {
    return (
        <div>
            <div className={`card bg-${props.color} text-white shadow`}>
                <div>
                    {props.nombre}
                </div>
            </div>
        </div>
    )
}
