import React, { Component } from 'react'
import formatCurrency from '../util'
import Fade from 'react-reveal/Fade'
export default class Cart extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:"",
            name:"",
            address:"",
            showCheckOut: false
        }
    }
    handleInput = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }
    createOrder = (e)=>{
        e.preventDefault()
        const order = {
            email:this.state.email,
            name:this.state.name,
            address:this.state.address,
            orders : this.props.cartItem
        }
        this.props.createOrder (order)
    }
    render() {
        const {cartItem} = this.props
        return (
            <>
            <div>
                {cartItem.length === 0 ? (
                    <div className="cart cart header">Cart is empty</div>
                ):(<div className="cart cart-header">You have {cartItem.length} in the cart</div>)}
            </div>
            <div>
                <div className="cart">
                    <ul className="cart-items">
                        {cartItem.map((item)=>{
                            return (
                                <>
                                <Fade left cascade>
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title}/>
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className="right">
                                        {formatCurrency(item.price)} x {item.count}
                                        <button className="button" onClick={()=>this.props.removeFromCart(item)}>Remove</button>
                                        </div>
                                    </div>
                                    
                                </li>
                                </Fade>

                                </>
                                
                            )
                        })}
                        
                    </ul>
                    
                </div>
                
                {cartItem.length !==0 && (
                <>
                    <div className="cart">
                        <div className="total">
                            <div>
                                Total:{" "}
                                {formatCurrency(cartItem.reduce((total,item)=>total + item.price * item.count,0))}
                            </div>
                            <button onClick={()=>this.setState({showCheckOut:true})} className="button primary">Proceed</button>
                        </div>
                    </div>
                    {this.state.showCheckOut && (
                        <Fade right cascade>
                        <div className="cart">
                            <form onSubmit={this.createOrder}>
                                <ul className="form-container">
                                    <li>
                                        <label>
                                            Email
                                        </label>
                                        <input name="email" type="email" required onChange={this.handleInput}/>
                                    </li>
                                     <li>
                                        <label>
                                            Name
                                        </label>
                                        <input name="name" type="text" required onChange={this.handleInput}/>
                                    </li>
                                     <li>
                                        <label>
                                            Address
                                        </label>
                                        <input name="address" type="text" required onChange={this.handleInput}/>
                                    </li>
                                    <li>
                                        <button className="button primary" type="submit">checkout</button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                        </Fade>
                    )}
                </>      
                )}
                </div>
            </>
        )
    }
}
