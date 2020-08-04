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


const foodValidate = (data) => {

}


const drinkValidate = (data) => {

    const joiSchema = Joi.object({
        name:Joi.string().min(6).required(),
        description:Joi.string().min(6),
        volume:Joi.object({
            value:Joi.number().required(),
            type:Joi.string().required().valid("ml", 'oz', 'gal','c','pt',),

        }),
        price:Joi.object({
            value:Joi.number().required(),
            quantity:Joi.number().required(),
            currency_code:Joi.string().required().valid('usd','eur','cad'),

        })
    })

    return joiSchema.validate({
        name:data.name,
        description:data.description,
        weight:data.weight,
        price:data.price,

    })
}



module.exports.userValidate = userValidate
module.exports.foodValidate = foodValidate
module.exports.drinkValidate = drinkValidate