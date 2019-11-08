const mongoose = require('mongoose');

const fundriserSchema = new mongoose.Schema({
    city:{
        type: String
    },
    country:{
        type: String
    },
    title:{
        type: String
    },
    description:{
        type: String
    },
    goalMoney:{
        type: Number
    }
})
// userSchema.statics.findByCredentials = async (email, password)=>{
//     const user =await User.findOne({ email })
//     if(!user){
//         throw new Error('unable to login')
//     }
//     const isMatch = await bcrypt.compare(password, user.password)   
//     if(!isMatch)
//         throw new Error('Unable to login')
//     return user
// }
// userSchema.methods.generateAuthToken = async function () {
//     const user = this;
//     const token = jwt.sign({_id: user._id.toString()}, 'hello')
//     user.tokens = user.tokens.concat({ token })
   
//     await user.save()

//     return token;
// }
// userSchema.methods.toJSON = function () {
//     const user = this
//     const userObject = user.toObject()

//     delete userObject.password;
//     delete userObject.tokens

//     return userObject
// }
fundriserSchema.pre('save', async function(next){
    const user = this;
    next()
})

const fundriser = mongoose.model('fundrisers', fundriserSchema)

module.exports = fundriser;