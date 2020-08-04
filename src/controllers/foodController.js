const router = require("express").Router();
const Food = require('../models/Food');
const { foodValidate } = require("../utils/validate.js");

module.exports.getFoods = async (req,res) => {
    
    try {
        
        const page = req.query.page >= 1 ? parseInt(req.query.page) : 0;
        const limit = req.query.limit >= 1 ? parseInt(req.query.limit) : 25;

        const data =  await Food.find({})
        // .select("name")
        .sort({ name: "asc" })
        .limit(limit)
        .skip(limit * page)

        if(!data )
            throw new Error('Error in fetching data')

        res.status(200).send({data:data});

    } catch (err) {
        res.status(500).send(err.message);
    }
  
}

module.exports.getFood = async (req,res) => {

    if(!req.params.foodID)
        return res.status(400).send('No search params provided')

    const foodID = req.params.foodID
    try {

        const data = await Food.findOne({ _id: foodID })

        res.status(200).json({data:data});   

    } catch (err) {

        res.status(500).send(err);

    }

}

module.exports.createFood = async (req,res) => {
    // validate incoming data
    const validation = foodValidate({
        name:req.body.name,
        description:req.body.description,
        weight:req.body.weight,
        price:req.body.price
    })

    
    if(validation.error) 
        return res.status(400).send(validation.error.details[0].message)

    try {
        const foodObj = {...req.body, creator: req.user._id  }
        // return res.json(foodObj)
        const food = new Food(foodObj)
        
        await food.save()

        res.status(201).json(foodObj)
    } catch (err) {
        res.status(400).send(err.message)
    }

}
module.exports.deleteFood = async (req,res) => {
    
    if(!req.params.foodID)
        return res.status(400).send('No Food ID provided')

    try {
        const deletedFood = await Food.findByIdAndDelete(req.params.foodID)

        if(!deletedFood) 
            throw new Error('Unable to Delete foodID:' + req.params.foodID)
        
        res.status(204).json({
            msg:'Deleted foodID:' + req.params.foodID, 
            data:deletedFood
        })
        

    } catch (err) {
        res.status(401).send(err.message)
    }
    
}
