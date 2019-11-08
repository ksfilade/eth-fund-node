const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const User = require('../models/fundriser')


router.post('/fundrisers', async(req, res) => {
    let fundriser = new User(req.body)
    console.log(fundriser);
    fundriser.save().then( async () => {
        // const token = await fundriser.generateAuthToken()
        res.send({ fundriser })
    }).catch((error) =>{
        res.send(error);
    })
    
})
// router.post('/users/login' ,async(req, res) => {
//     try{
//         const user = await User.findByCredentials(req.body.email, req.body.password)
//         const token = await user.generateAuthToken()
//         res.send({ user, token })
//     }catch (e){
//         res.status(400).send()
//     }
// })
// router.post('/users/logout',auth ,async(req, res) => {
//     try{
//         req.user.tokens = req.user.tokens.filter((token) => {
//             return token.token !=req.token
//         })
//         await req.user.save()
//         res.send({success: true})
//     }catch (e){
//         res.send('failed logout')
//     }
// })
// router.get('/users/private',auth, async(req, res) =>{
//     res.send({ message:'hello world' })
// })

module.exports = router