const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donationFrom:{
        type: String
    },
    donationTo:{
        type: String
    },
    amount:{
        type: Number
    },
    dateDonated:{
        type: Date
    },
    fromId:{
        type: String
    },
    toId:{
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
// fundriserSchema.methods.toJSON = function () {
//     const fundriser = this
//     const fundriserObject = fundriser.toObject()
//     if (fundriserObject.thumbnail) {
//         fundriserObject.image = '/fundrisers/image/'+fundriser.id;
//     }
//     delete fundriserObject.thumbnail;

//     return fundriserObject
// }
donationSchema.pre('save', async function(next){
    next()
})

const donation = mongoose.model('donations', donationSchema)

module.exports = donation;