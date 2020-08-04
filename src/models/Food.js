const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new mongoose.Schema({
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
    weight: {
        value:Number,
        type: { 
            type:String,
            // Weight: ounce (oz), pound (lb), gram (g), kilogram (kg)
            enum:['lbs','kg','oz', 'g']
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

module.exports = mongoose.model('Food', foodSchema);