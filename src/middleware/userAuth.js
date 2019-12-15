const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userAuth = async (req, res, next) =>{
    try {
        const token = req.header('token')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded._id != req.params.id)
            throw new Error()
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        
        if(!user)
           throw new Error()

        req.user = user;
        req.token = token;
        next()
    } catch (error) {
        res.send({'error': 'please authentiacate'})
    }
    
}
module.exports = userAuth