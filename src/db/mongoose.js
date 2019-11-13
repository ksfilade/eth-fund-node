const mongoose = require('mongoose');

const connectionURL = process.env.MONGODB_URL
const databseName = 'test'

mongoose.connect(connectionURL, { useNewUrlParser: true,useCreateIndex: true  })

// const User = mongoose.model('',{
//     name:{
//         type: String
//     },
//     age:{
//         type: Number
//     }
// })
// const me = new User({
//     name:'kire',
//     age: 28
// })
// me.save().then(() => {
//     console.log(me);
// }).catch((error) =>{
//     console.log(error);
// })