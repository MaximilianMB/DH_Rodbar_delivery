import React, { Component } from 'react'
import { ProductCard } from './ProductCard'

export class Products extends Component {
    constructor(props){
        super(props)
        this.state = {
            productList: []
        }
    }

    componentDidMount = ()=>{
        fetch("http://localhost:3001/api/products")
            .then(response => response.json())
            .then(data => this.setState({productList : data.products}))
            .catch((e)=> console.log(e))
    }
    render() {
        return (
            <div style={{width: "80%", margin: "auto", color:"white", marginTop:"3%"}}>
                {this.state.productList.map((product) => {
                    return <ProductCard id={product.id} nombre={product.nombre} ingredientes={product.ingredientes} precio={product.precio} showHeader={product.id === 1}/>
                })}
            </div>
        )
    }
}
