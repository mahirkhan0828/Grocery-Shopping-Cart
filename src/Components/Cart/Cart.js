import React from 'react';
import './Cart.css';
import {Item} from '../Item/Item';
const axios = require('axios');

export class Cart extends React.Component{
    constructor(props){
        super(props);
        this.getCartData = this.getCartData.bind(this);
        this.reload = this.reload.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.state = {
            data: []
        }
    }
    getCartData(){
        let productList = [];
        let data = axios.get(`https://obscure-citadel-45579.herokuapp.com/ShoppingCart`);
        data.then(response=>{
            let products = response['data'];
            for (let i = 0; i < products.length;i++){
                productList.push(products[i]);
            }
            this.setState({data: productList});
        })
    }
    deleteAll(){
        axios.delete(`https://obscure-citadel-45579.herokuapp.com/ShoppingCart/deleteall`);
        alert("All products successfully removed from shopping cart.");
    }
    reload(){
        window.location.reload();
    }
    componentDidMount(){
        this.getCartData();
    }

    render(){
        if (this.state.data.length === 0){
            return(
                <div>
                    <h1>Shopping Cart</h1>
                    <button onClick = {this.reload}>Refresh Cart</button>
                    <h3>Nothing added to Shopping Cart yet.</h3>
                </div>
            )
        }
        return(
            <div className = "Items-list">
                <h1>Shopping Cart</h1>
                <button onClick = {this.reload}>Refresh Cart</button>
                <div className = "Items">
                    {this.state.data.map(item=>{
                        return(
                            <span className = 'IndividualItem'>
                                <Item product = {item} key = {item.calories}></Item>
                            </span>
                        )
                    })}
                </div>
                <button onClick = {this.deleteAll}>Remove All</button>

            </div>

        )
    }
}