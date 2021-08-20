import React, { Component } from 'react'
import formatCurrency from './util'
export default class Pdroducts extends Component {
    render() {
        return (
            <div>
                <ul className="products">
                    {
                        this.props.products.map(product=>(
                            <li key={product._id}>
                                <div className="product">
                                    <a href={"#" +product._id}>
                                        <img src={product.image} alt="product" />
                                        <p>{product.title}</p>
                                    </a>
                                    <div className="product-price">
                                        <div>{formatCurrency(product.price)}</div>
                                        <button className="button primary" onClick={()=>this.props.addToCart(product)}>Add To Cart</button>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}
