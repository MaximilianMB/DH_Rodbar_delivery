import React from 'react'
import { TopBar } from './TopBar'
import { LastProduct } from './LastProduct'
import { Category } from './Category'
import { Products } from './Products'

export const ContentRight = () => {
    return (
        <div>
            <TopBar/>
            <LastProduct/>
            <Category/>
            <Products/>
        </div>
    )
}
