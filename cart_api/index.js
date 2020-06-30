const express = require('express');
let shoppingCart = require('./data');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

app.get('/',(req,res)=>{
    res.send("Server is up and running.")
})

app.get('/ShoppingCart',(req,res)=>{
    res.send(shoppingCart);
});

app.post('/ShoppingCart/create',(req,res)=>{
    newProduct = {'brand':req.query.brand, 'name': req.query.name,
    'calories': Number(req.query.calories), 'serving_size': Number(req.query.serving_size),
    'serving_unit': req.query.serving_unit, 'image_src': req.query.image_src};
    shoppingCart.push(newProduct);
    res.send(newProduct);
});

app.delete('/ShoppingCart/delete',(req,res)=>{
    try{
        for (let i = 0; i < shoppingCart.length; i++){
            if (req.query.image_src == shoppingCart[i]['image_src']){
                delete shoppingCart[i];
            }
        }
    }catch(e){
        console.log('Operation to delete failed');
    }
    shoppingCart = shoppingCart.filter((product) =>{
        return product != null;
    });
    res.send(shoppingCart);
});
app.delete('/ShoppingCart/deleteall',(req,res)=>{
    shoppingCart = [];
    res.send(shoppingCart);
})

app.listen(PORT, () => {
    console.log('Listening on port '+PORT);
});

