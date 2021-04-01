import React from "react";
import Products from './components/Products'
import data from './data.json';
import Filter from './components/Filter'
import Cart from './components/Cart'
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      products : data.products,
      cartItems: localStorage.getItem("item") ? JSON.parse(localStorage.getItem("item")) : [],
      sort:"",
      size:""
    }
  }
  removeFromCart = (product)=>{
    
    this.setState({
      cartItems: this.state.cartItems.filter((item)=>item._id !== product._id)
    })
    localStorage.setItem("item",JSON.stringify(this.state.cartItems.filter((item)=>item._id !== product._id)))
    
  }
  addToCart = (product)=>{
    const cartItems = this.state.cartItems.slice()
    let alreadyInCart = false
    cartItems.forEach((item)=>{
      if(item._id === product._id){
        item.count++
        alreadyInCart = true
      }
    })
    if(!alreadyInCart){
      cartItems.push({...product,count:1})
    }
    this.setState({cartItems})
    localStorage.setItem("item",JSON.stringify(cartItems))
  }
  filterProducts = (e)=>{
    if(e.target.value === ""){
      this.setState({
        size:e.target.value,products:data.products
      })
    } else {
      this.setState({
        size:e.target.value,
        products:data.products.filter((item)=>item.availableSizes.indexOf(e.target.value) >=0)
      })
    }
  }
  sortProducts = (e)=>{
    if(e.target.value === "Lowest"){
      this.setState({
        sort:e.target.value,products:this.state.products.sort((a,b)=>a.price - b.price)
      })
    } else if (e.target.value === "highest"){
      this.setState({sort:e.target.value,products:this.state.products.sort((a,b)=>b.price - a.price)})
    } else {
      this.setState({sort:e.target.value,products:this.state.products.sort((a,b)=>a._id - b._id)})
    }
    
  }
  createOrder = (order) => {
    alert("Need to save" + order.name)
  }
  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length} sort={this.state.sort} size={this.state.size} filterProducts={this.filterProducts} sortProducts={this.sortProducts}/>
              <Products products={this.state.products} addToCart={this.addToCart}/>
            </div>
            <div className="sidebar">
              <Cart cartItem = {this.state.cartItems} removeFromCart={this.removeFromCart} createOrder={this.createOrder}/>
            </div>
          </div>
        </main>
        <footer>
          All copy right.
        </footer>
      </div>
    );
  }
}

export default App;
