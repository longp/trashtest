const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drinkSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        max:100,
        min:6
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


module.exports = mongoose.model('Drink', drinkSchema);