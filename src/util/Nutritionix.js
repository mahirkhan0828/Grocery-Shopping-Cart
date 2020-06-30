const axios = require('axios');


const appId = '34f6f25d';
const appKey = '9fabfd8e5046ef072c7169f29614bf23';

const Nutrition = {
    search(foodItem, maxCalories, sortByFunc){
        const Url = `https://trackapi.nutritionix.com/v2/search/instant?query=${foodItem}`;
        const data = axios.get(Url, {
            headers: {
                "x-app-id" : appId,
                "x-app-key" : appKey
            }
        }).then(response => {
            return response["data"]["branded"]
        }).then(products => {
            return products.map(product => ({
                brand: product["brand_name"],
                name: product["food_name"],
                id: product["nix_item_id"],
                serving_size: product["serving_qty"].toFixed(2),
                serving_unit: product["serving_unit"],
                image_src: product["photo"]["thumb"],
                calories: product["nf_calories"].toFixed(0)
            })
            )
        });
        return data;
    }
};


export default Nutrition;