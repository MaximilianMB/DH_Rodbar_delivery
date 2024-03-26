
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
            <div>
                <div>
                    <div>
                        <h5 onMouseEnter={()=>{this.cambiarColor()}} onMouseLeave={()=>{this.volverColor()}} className="m-0 font-weight-bold text-gray-800">{this.props.titulo}</h5>
                    </div>
                    <div>
                        <div>
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
