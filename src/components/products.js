import React, { Component } from 'react'
import formatCurrency from './util'
import Fade from 'react-reveal/Fade';
import  Modal from 'react-modal'
import  Zoom from "react-reveal/Zoom"

export default class Pdroducts extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             product:null
        }
    }
    openModal= (product)=>{
        this.setState({
            product
        })
    }

    closeModal= ()=>{
        this.setState({
            product:null
        })
    }

    componentDidMount() {
    Modal.setAppElement('body');
 }
    render() {
         const {product} = this.state
        return (
          <div>
            <Fade bottom cascade>
              <ul className="products">
                {this.props.products.map((product) => (
                  <li key={product._id}>
                    <div className="product">
                      <a
                        href={"#" + product._id}
                        onClick={() => this.openModal(product)}
                      >
                        <img src={product.image} alt="product" />
                        <p>{product.title}</p>
                      </a>
                      <div className="product-price">
                        <div>{formatCurrency(product.price)}</div>
                        <button
                          className="button primary"
                          onClick={() => this.props.addToCart(product)}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
            {product && (
              <Modal isOpen={true} openRequestClose={this.closeModal}>
                <Zoom>
                  <button className="close-modal" onClick={this.closeModal}>
                    x
                  </button>
                  <div className="product-details">
                    <img src={product.image} alt={product.title}  />
                    <div className="product-details.description" style={{marginRight:'20px'}}>
                      <p>
                        <strong>{product.title}</strong>
                      </p>
                      <p>
                        <strong>{product.discription}</strong>
                      </p>
                      <p>
                        Available Sizes: {""}
                        {product.availableSizes.map((x , index) => (
                          <span style={{paddingRight:"5px"}} key={index}>
                            {""}
                            <button className="button">{x}</button>
                          </span>
                          
                        ))}
                      </p>
                

                      <div className="product-price">
                        <div>{formatCurrency(product.price)}</div>
                        <button
                          className="button primary"
                          onClick={() => {
                            this.closeModal();
                            this.props.addToCart(product);
                          }}
                        >
                          {" "}
                          addToCart
                        </button>
                      </div>
                    </div>
                  </div>
                </Zoom>
              </Modal>
            )}
          </div>
        );
    }
}
