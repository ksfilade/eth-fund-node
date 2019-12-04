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
    },
    thumbnail:{
        type: Buffer
    },
    walletAddress:{
        type: String
    },
    category:{
        type: String
    },
    dateCreated:{
        type: Date
    },
    organaiser:{
        type: String
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