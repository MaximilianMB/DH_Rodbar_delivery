
import React, { Component } from 'react'
import { CategoryCard } from './CategoryCard'

export class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryList: [

            ],
            color: "dark"
        }
    }
    cambiarColor(){
        this.setState({
            color: "secondary"
        })
    }
    volverColor(){
        this.setState({
            color: "dark"
        })
    }

    componentDidMount = () => {
        fetch("http://localhost:3001/api/categories")
            .then(response => response.json())
            .then(categories => this.setState({ categoryList: categories.categories }))
            .catch((e) => console.log(e))

    }

    render() {
        return (
            <div className='categoria-tarjeta-grande'>
                <div className='categoria-tarjeta-chica'>
                    <div className='categoria-titulo'>
                        <h4 onMouseEnter={()=>{this.cambiarColor()}} onMouseLeave={()=>{this.volverColor()}}>Categorias</h4>
                    </div>
                    <div className='categorias-tarjetas'>
                        <div className='categorias-tarjetas-columnas'>
                            {this.state.categoryList.map((category, index) => {
                                return <CategoryCard color={this.state.color} key={index} nombre={category.nombre}/>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
