const mongoose = require('mongoose');
const User = require('../models/user')


const commentsSchema = new mongoose.Schema({
    fundriserId:{
        type: String
    },
    comment:{
        type: String
    },
    commentName:{
        type: String
    },
    amount:{
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
// fundriserSchema.index( {title: 'text'} )
commentsSchema.methods.toJSON = function () {
    const fundriser = this
    const fundriserObject = fundriser.toObject()
    if (fundriserObject.thumbnail) {
        fundriserObject.image = '/fundrisers/image/'+fundriser.id;
    }
    delete fundriserObject.thumbnail;

    return fundriserObject
}
commentsSchema.pre('save', async function(next){
    const user = this;
    next()
})

const comments = mongoose.model('comments', commentsSchema)

module.exports = comments;