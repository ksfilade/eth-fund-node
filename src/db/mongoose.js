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
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGQyNmY0MmUxZDljOTAwMTc5YzQxYjUiLCJpYXQiOjE1NzY2NjU1OTB9.V-BviekMrsz2nnTfBmeGMEYtW3wrZlMEebzH1LQQr4E
// 5dd26f42e1d9c900179c41b5
// 5df752ff015b3e001714600f