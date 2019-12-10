const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) =>{
    console.log('auth middlewere');
    try {
        const token = req.header('token')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token, admin: true })
        
        if(!user)
           throw new Error()

        req.user = user;
        req.token = token;
        next()
    } catch (error) {
        res.send({'error': 'please authentiacate'})
    }
    
}
module.exports = auth