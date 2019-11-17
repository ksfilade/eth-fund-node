const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const Fundriser = require('../models/fundriser')

const multer = require('multer')
const upload = multer({
    limits: {
        fileSize: 10000000
    },
    // fileFilter(req, file, cb){
    //     console.log('object filter');
    //     if (!file.originalname.endsWith('.png')) {
    //        return cb(new Error('Please upload a png')) 
    //     }
    //     cb(undefined, true)
    // }

})
router.post('/fundrisers', upload.single('upload'), async(req, res) => {
    console.log('object');
    let fundriser = new Fundriser(req.body)
    console.log(req.file);
    if (req.file) 
        fundriser.thumbnail = req.file.buffer
    
   
    fundriser.save().then( async () => {
        // const token = await fundriser.generateAuthToken()
        res.send({ fundriser })
    }).catch((error) =>{
        res.send(error);
    })
    
})
router.get('/fundrisers', async(req, res) => {
    Fundriser.find().limit( parseInt( req.query.limit )).skip(parseInt( req.query.skip )).then(results =>{
        res.send({ results })
    }).catch((err) =>{
        res.send(err);
    })
})
router.get('/fundrisers/image/:id', async(req, res) => {
   try{
        const fundriser = await Fundriser.findById(req.params.id)

        res.set('Content-Type', 'image/png')
        res.send(fundriser.thumbnail)
    }catch{
        res.send('error')
    }
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