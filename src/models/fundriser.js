const mongoose = require('mongoose');
const User = require('../models/user')


const fundriserSchema = new mongoose.Schema({
    createdBy:{
        type: String
    },
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
    },
    thumbnail:{
        type: Buffer
    },
    walletAddress:{
        type: String
    },
    category:{
        type: String,
        trim: true
    },
    dateCreated:{
        type: Date
    },
    organaiser:{
        type: String
    },
    featured:{
        type: Boolean,
        default: false
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
fundriserSchema.index( {title: 'text'} )
fundriserSchema.methods.toJSON = function () {
    const fundriser = this
    const fundriserObject = fundriser.toObject()
    if (fundriserObject.thumbnail) {
        fundriserObject.image = '/fundrisers/image/'+fundriser.id;
    }
    delete fundriserObject.thumbnail;

    return fundriserObject
}
fundriserSchema.pre('save', async function(next){
    const user = this;
    next()
})

const fundriser = mongoose.model('fundrisers', fundriserSchema)

module.exports = fundriser;