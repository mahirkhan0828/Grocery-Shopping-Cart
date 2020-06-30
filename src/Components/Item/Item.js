import React from 'react';
import './Item.css';
const axios = require('axios')

export class Item extends React.Component{
    constructor(props){
        super(props);
        this.addToShoppingCart = this.addToShoppingCart.bind(this);
        this.deleteFromShoppingCart = this.deleteFromShoppingCart.bind(this);
    }
    addToShoppingCart(){
        let brand = this.props.product.brand;
        let name = this.props.product.name;
        let calories = this.props.product.calories;
        let serving_size = this.props.product.serving_size;
        let serving_unit = this.props.product.serving_unit;
        let image_src = this.props.product.image_src;

        if (name){
            axios.post(`https://obscure-citadel-45579.herokuapp.com/ShoppingCart/Create/?brand=${brand}
            &name=${name}&calories=${calories}&serving_size=${serving_size}
            &serving_unit=${serving_unit}&image_src=${image_src}`);
        }
        // Check if the item is from the items list or the shopping cart.
        // We only want to reload page if the user is in the shopping cart page.
        if(!this.props.product.id){
            window.location.reload();
        }else{
            alert("Product successfully added to Shopping Cart on Top Right");
        }

    }
    deleteFromShoppingCart(){
        let image_src = this.props.product.image_src;
        if(image_src){
            axios.delete(`https://obscure-citadel-45579.herokuapp.com/ShoppingCart/delete/?image_src=${image_src}`);
        }
        alert("Product successfully removed from Shopping Cart");
    }
    render(){
        if (this.props.product == null){
            return(
                <div></div>
            );
        }
        return(
            <div className = 'Item'>
                <div className = 'Item-brand'>
                    <p>Brand: {this.props.product.brand}</p>
                </div>
                <div className = 'Item-name'>
                    <p>{this.props.product.name}</p>
                </div>
                <hr></hr>
                <div className = 'Item-information'>
                    <p><b>Calories:</b> {this.props.product.calories}</p>
                    <p><b>Serving Size:</b> {this.props.product.serving_size}</p>
                    <p><b>Serving Unit:</b> {this.props.product.serving_unit}</p>
                </div>
                <div className = "buttons">
                    <form action={this.props.product.image_src} method="get" target="_blank">
                        <button type="submit">Click for Image</button>
                    </form>
                    <button onClick = {this.addToShoppingCart}>Add to Cart</button>
                    <button onClick = {this.deleteFromShoppingCart}>Remove from Cart</button>
                </div>
            </div>
        );
    }
}