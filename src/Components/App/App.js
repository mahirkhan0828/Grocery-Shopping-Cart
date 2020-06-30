import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {ItemsList} from '../ItemsList/ItemsList';
import {Cart} from '../Cart/Cart';
import Nutrition from '../../util/Nutritionix';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const axios = require('axios');


export class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      count : 0
    };
    this.getNutrition = this.getNutrition.bind(this);
    }

  getNutrition(foodItem, maxCalories, sortByFunc){
    let productArray = [];
    let data = Nutrition.search(foodItem);
    data.then(response=> {
      for (let i = 0; i < 20; i++){
        productArray.push(response[i]);
      }
      //Filter out the results that are more than the max calories
      let productArrayReal;
      try{
        productArrayReal = productArray.filter(product=>{
          return product.calories <= maxCalories
        });
      }catch(err){
        console.log(err)
      }
      //Sort by the function passed from SearchBar Component
      if (sortByFunc){
        sortByFunc(productArrayReal)
      }
      // Set state so we can pass the products to the items list and change count to 1 so
      // we know that the function has already ran once
      this.setState({searchResults: productArrayReal});
      this.setState({count:1});
    })
  }
  resetBackendData(){
    axios.delete(`https://obscure-citadel-45579.herokuapp.com/ShoppingCart/deleteall`);
  }
  clearOutOldData(){
    // This will make sure that every time a new page is brought up, old backend data from 
    // another user will be deleted.
    window.addEventListener('load', (event) => {
      event.preventDefault();
      event.returnValue = '';
      this.resetBackendData();
    });    
  }
  componentDidMount(){
    if (window.location.href !== "http://grocerycaloriecounter.surge.sh/ShoppingCart"){
      this.clearOutOldData();
    }
  }
  componentWillUnmount(){
    // Cleanup the event listener that was added before.
    if (window.location.href !== "http://grocerycaloriecounter.surge.sh/ShoppingCart"){
      window.removeEventListener('load', (event) => {
        event.preventDefault();
        event.returnValue = '';
        this.resetBackendData();
      }
    )};
  }

  render(){
    return(
      <Router>
          <div className="header">
            <p className = "nutritionix"><b>Data from </b><a href = "https://www.nutritionix.com/business/api" target = "_blank" rel="noopener noreferrer">Nutritionix API</a></p>
            <div className = "ShoppingCart"><p><a href= "/ShoppingCart" target = "_blank">Shopping Cart</a></p></div>
            <a href = '/ShoppingCart' target ="_blank">
              <img src = "https://icon2.cleanpng.com/20171220/jpe/shopping-cart-png-5a3a8fca5f1485.3449050215137873383895.jpg" alt = "Cart Logo"></img>
            </a>
          </div>
          <div className = "break"></div>
          <Switch>
            <Route path = "/ShoppingCart">
              <div className = "App">
                <Cart/>
              </div>
            </Route>
            <Route path = "/">
            <div className = "App">
              <h1>Find the Calories</h1>
              <SearchBar getNutrition = {this.getNutrition}/>
              <ItemsList products = {this.state.searchResults} count = {this.state.count}/>  
            </div>
            </Route>
          </Switch>
      </Router>

    );
  }
}


  

