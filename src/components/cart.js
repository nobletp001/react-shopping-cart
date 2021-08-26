import React, { Component } from 'react'
 import  formatCurrency from './util'
import Fade from "react-reveal/Fade";

export default class Cart extends Component {
  constructor(props) { 
    super(props)
  
    this.state = {
       showCheckOut:false,
       name:"",
       email:"",
       address:" "
    }
  }
  
  handleInput= (e)=>{
    this.setState({[e.target.name]:e.target.value})
  }
  createOrder= (e)=>{
    e.preventDefault();
    const order ={
      name:this.state.name,
      email:this.state.email,
      address:this.state.address,
      cartItems:this.props.cartItems
      
    }
    this.props.createOrder(order)
  }
    render() {
        const {cartItems}= this.props;
        return (
          <>
            <div>
              {cartItems.length === 0 ? (
                <div className="cart cart-header">Cart is empty</div>
              ) : (
                <div className="cart cart-header">
                  {" "}
                  You have {cartItems.length} in the cart
                </div>
              )}
              <div>
                <div className="cart">
                  <Fade left cascade>
                    <ul className="cart-items">
                      {cartItems.map((item) => (
                        <li key={item._id}>
                          <div className="showFlex">
                            <div>
                              <img src={item.image} alt={item.title} />
                            </div>
                            <div>
                              <div>{item.title}</div>
                              <div className="right">
                                {formatCurrency(item.price)} X {item.count}
                                {""}
                                <button
                                  onClick={() =>
                                    this.props.removeFromCart(item)
                                  }
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Fade>
                </div>
                {cartItems.length !== 0 && (
                  <div>
                    <div>
                      <div className="cart">
                        <div className="total">
                          <div>
                            {" "}
                            Total:{" "}
                            {formatCurrency(
                              cartItems.reduce(
                                (a, c) => a + c.price * c.count,
                                0
                              )
                            )}
                          </div>
                          <button
                            className="button primary"
                            onClick={() => {
                              this.setState({
                                showCheckOut: true,
                              });
                            }}
                          >
                            Proceed
                          </button>
                        </div>
                      </div>
                    </div>
                    {this.state.showCheckOut && (
                      <div className="cart">
                        <Fade down cascade>
                          <form onSubmit={this.createOrder}>
                            <ul className="form-container">
                              <li>
                                <label htmlFor="">Email</label>
                                <input
                                  type="email"
                                  required
                                  onChange={this.handleInput}
                                  name="email"
                                />
                              </li>
                              <li>
                                <label htmlFor="">Name</label>
                                <input
                                  type="text"
                                  required
                                  onChange={this.handleInput}
                                  name="name"
                                />
                              </li>
                              <li>
                                <label htmlFor="">Address</label>
                                <input
                                  type="text"
                                  required
                                  onChange={this.handleInput}
                                  name="address"
                                />
                              </li>
                              <li>
                                <button
                                  type="submit"
                                  className="button primary"
                                >
                                  {" "}
                                  CheckOut
                                </button>
                              </li>
                            </ul>
                          </form>
                        </Fade>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        );
    }
}
