const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drinkSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        max:100,
        min:6
    },
    description: {
        type:String,
        required:true,
        max:1024,
        min:6,
        
    },
    volume: {
        value:Number,
        type: { 
            type:String,
            // Volume: fluid ounce (oz), cup (c), pint (pt), quart (qt), gallon (gal)
            enum:["ml", 'oz', 'gal','c','pt',]
        }
    },
    price: {
        quantity:Number,
        value:{
            type:Number,
            get: getPrice, 
            set: setPrice ,
        },
        currency_code: {
            type:String,
            enum:['usd','eur','cad']
        }
    },
    dateAdded: {
        type: Date,
        default:Date.now
    },
    creator: {type:Schema.Types.ObjectId, ref:'User'}

});

function getPrice(num){
    // if(typeof num === 'string') num = parseFloat(num)
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

module.exports = mongoose.model('Drink', drinkSchema);