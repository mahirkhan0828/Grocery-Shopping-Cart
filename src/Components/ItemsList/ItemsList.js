import React from 'react';
import './ItemsList.css';
import {Item} from '../Item/Item';

export class ItemsList extends React.Component{
    render(){
        // Check to see if results were found 
        let productArraySize;
        let isUndefined = false;
        try{
            productArraySize = this.props.products.length;
        }catch(err){
            isUndefined = true;
            console.log('No results were found')
        }
        if ((productArraySize === 0 && this.props.count === 1) || isUndefined){
            return(
                <div className = 'no_results'>
                    <h1>No Results Found!</h1>
                    <h3>Try again with different filters</h3>
                </div>
            )
        } else{
            return(
                <div className = 'Items_list'>
                    {this.props.products.map(item=>{
                        return <Item product = {item} key = {item.id}/>
                    }
                    )}
    
                </div>
            )
        }
    }
}