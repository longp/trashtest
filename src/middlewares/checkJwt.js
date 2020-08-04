const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async(req, res, next) => {
    try {
        if(!req.headers['authorization']) {
            throw new Error('Authorization header not set check again')
        }

        const token = req.headers['authorization'].replace('Bearer ', '')

        const data = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: data._id })
        if (!user) {
            throw new Error('Not authorized to access this resource' )
        }

        req.user = {
            email:user.email,
            dateAdded:user.dateAdded,
            _id:user._id
        }

        req.token = token
        next()
    } catch (error) {
        const msg = error.message ? error.message : 'Not authorized to access this resource' 
        res.status(401).send({ error: msg })
    }
}

module.exports = auth