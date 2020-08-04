const Joi = require('@hapi/joi');

const userValidate = (data) => {

    const joiSchema = Joi.object({
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required()
    })

    return joiSchema.validate({
        email:data.email,
        password:data.password,
    })
}


const drinkValidate = (data) => {

    const joiSchema = Joi.object({
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required()
    })

    return joiSchema.validate({
        email:data.email,
        password:data.password,
    })
}


module.exports.userValidate = userValidate
module.exports.drinkValidate = drinkValidate