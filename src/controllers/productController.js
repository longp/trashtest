const router = require("express").Router();
const Food = require('../models/Food');
const Drink = require('../models/Drink');

module.exports.getProducts = async (req,res) => {
    
    try {
        
        const page = req.query.page >= 1 ? parseInt(req.query.page) : 0;
        const limit = req.query.limit >= 1 ? parseInt(req.query.limit) : 25;

        const foodData =  Food.find({})
        .sort({ name: "asc" })
        .limit(limit)
        .skip(limit * page)

        const drinkData = Drink.find({})
        .sort({ name: "asc" })
        .limit(limit)
        .skip(limit * page)

        // const data = {
        //     "drinks":drinkData,
        //     "food":foodData
        // }

        const data = await Promise.all([drinkData,foodData])
        // console.log(data)
        if(!data )
            throw new Error('Error in fetching data')

        res.status(200).send({data: { 
            "foods":data[1],
            "drinks":data[0]
        }});

    } catch (err) {
        res.status(500).send(err.message);
    }
  
}
