import React from 'react';
import './SearchBar.css';


export class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            foodItem : '',
            maxCalories : Infinity
        };   
        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleCaloriesChange = this.handleCaloriesChange.bind(this);
        this.handleSearchResultsNormal = this.handleSearchResultsNormal.bind(this);
        this.handleSearchResultsSorted = this.handleSearchResultsSorted.bind(this);
        this.sortByCalories = this.sortByCalories.bind(this);
    }
        

    handleItemChange(event){
        this.setState({
            foodItem : event.target.value
        })
    }

    handleCaloriesChange(event){
        this.setState({
            maxCalories : Number(event.target.value)
        })
    }

    sortByCalories(productArray){
        try{
            productArray.sort(function(a,b){return a.calories - b.calories});
        }catch(err){
            console.log('Was not able to sort due to no results popping up')
        }  
    }

    handleSearchResultsNormal(event){
        //This is for when the sort by best match is rendered
        this.props.getNutrition(this.state.foodItem,this.state.maxCalories, null);
        event.preventDefault();
    }

    handleSearchResultsSorted(event){
        //This is for when the sort by lowest calories is rendered
        this.props.getNutrition(this.state.foodItem, this.state.maxCalories, this.sortByCalories);
        event.preventDefault();
    }

    render(){
        return (
            <div className = "Bar" id = "background_image">
                <div className = "SearchBar">
                    <input placeholder = "Enter Food Item" onChange = {this.handleItemChange}/>
                    <input placeholder = "Max Calories per Serving" onChange = {this.handleCaloriesChange}/>
                </div>
                <div>
                    <h2>Sort By:</h2>
                    <ul>
                        <li><button onClick = {this.handleSearchResultsNormal}>Best Match</button></li>
                        <li><button onClick = {this.handleSearchResultsSorted}>Lowest Calories</button></li>
                    </ul>
                </div>
            </div>
        )
    }
}