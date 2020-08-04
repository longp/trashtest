const router = require("express").Router();
const User = require('../models/User');
const Drink = require('../models/Drink');
// const { drinkValidate } = require("../utils/validate.js");

module.exports.createDrink = async (req,res) => {
    // validate incoming data
    // const validation = userValidate({
    //     email:req.body.email,
    //     password:req.body.password,
    // })

    // if(validation.error) 
    //     return res.status(400).send(validation.error.details[0].message)

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