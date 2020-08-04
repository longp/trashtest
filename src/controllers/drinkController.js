const router = require("express").Router();
const User = require('../models/User');
const Drink = require('../models/Drink');
const { drinkValidate } = require("../utils/validate.js");

module.exports.getDrinks = async (req,res) => {
   
    try {
        
        const page = req.query.page >= 1 ? parseInt(req.query.page) : 0;
        const limit = req.query.limit >= 1 ? parseInt(req.query.limit) : 25;

        const data =  await Drink.find({})
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

module.exports.getDrink = async (req,res) => {
   
    if(!req.params.drinkID)
        return res.status(400).send('No search params provided')

    const drinkID = req.params.drinkID
    try {

        const data = await Drink.findOne({ _id: drinkID })

        res.status(200).json({data:data});   

    } catch (err) {

        res.status(500).send(err);

    }
  
}

module.exports.createDrink = async (req,res) => {
    // validate incoming data
    const validation = drinkValidate({
        name:req.body.name,
        description:req.body.description,
        volume:req.body.volume,
        price:req.body.price
    })
    if(validation.error) 
        return res.status(400).send(validation.error.details[0].message)

    try {
        const drinkObj = {...req.body, creator: req.user._id  }
        // return res.json(drinkObj)
        const drink = new Drink(drinkObj)
        await drink.save()
        // res.status(201).send({ user, token })
        res.status(201).json(drinkObj)
    } catch (error) {
        res.status(400).send(error)
    }

}
module.exports.deleteDrink = async (req,res) => {

    if(!req.params.drinkID)
        return res.status(400).send('No Drink ID provided')

    try {
        const deletedDrink = await Drink.findByIdAndDelete(req.params.drinkID)

        if(!deletedDrink) 
            throw new Error('Unable to Delete DrinkID:' + req.params.drinkID)
        
        res.status(204).json({
            msg:'Deleted drinkID:' + req.params.drinkID, 
            data:deletedDrink
        })
        

    } catch (err) {
        res.status(401).send(err.message)
    }
    
}
