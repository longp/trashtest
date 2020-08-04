const router = require("express").Router();
const User = require('../models/User');
const { userValidate } = require("../utils/validate.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.register = async (req,res) => {
    // validate incoming data
    const validation = userValidate({
        email:req.body.email,
        password:req.body.password,
    })

    if(validation.error) 
        return res.status(400).send(validation.error.details[0].message)
    
    
    // check if user is in db
    const userCheck = await User.findOne({email:req.body.email})

    if(userCheck)
        return res.status(400).send('Email already exists');
    
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        // res.status(201).send({ user, token })
        res.status(201).json({
            email:user.email,
            id:user._id,
            dateAdded:user.dateAdded,
            authToken:token
        })
    } catch (error) {
        res.status(400).send(error)
    }
}