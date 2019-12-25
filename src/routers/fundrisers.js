const express = require('express')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')
const userAuth = require('../middleware/userAuth')

const jwt = require('jsonwebtoken')

const router = new express.Router()
const Fundriser = require('../models/fundriser')
const Donation = require('../models/donations')

const multer = require('multer')
const upload = multer({
    limits: {
        fileSize: 10000000
    },
})
router.post('/fundrisers', auth, upload.single('upload'), async (req, res) => {
    let fundriser = new Fundriser(req.body)
    fundriser.dateCreated = (new Date()).toLocaleDateString();
    const token = req.header('token')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    fundriser.createdBy = decoded._id.toString()
    if (req.file)
        fundriser.thumbnail = req.file.buffer
    fundriser.save().then(async () => {
        // const token = await fundriser.generateAuthToken()
        res.send({ fundriser })
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })

})
router.post('/fundrisers/donation', async (req, res) => {
    let donation = new Donation(req.body)
    donation.dateDonated = (new Date()).toLocaleDateString()
    donation.save().then(async () => {
        // const token = await fundriser.generateAuthToken()
        res.send({ donation })
    }).catch((error) => {
        res.send(error);
    })

})
router.get('/fundrisers', async (req, res) => {
    let results = await Fundriser
        .find(req.query.featured ? { featured: req.query.featured } : void 0)
        .find(req.query.category ? { category: req.query.category } : void 0)
        .find(req.query.keyword ? { $text: { $search: req.query.keyword } } : void 0)
        .limit(parseInt(req.query.limit))
        .sort({ _id: -1 })
        .skip(parseInt(req.query.skip))

        results.forEach(async(el,index,arr) =>{
            console.log(el);
           await  Donation.aggregate([
                { $match: { donationTo: '5df645c3c30d5800178e2320' } },
                { $group: { _id : '5df645c3c30d5800178e2320', sum : { $sum: "$amount" } } }])
                .then((res)=>{
                    console.log(res);
                    arr[index].sum = res[0].sum;
            });
        })
    res.send({ results });

})
router.get('/fundrisers/user/:id', userAuth, async (req, res) => {
    let results = await Fundriser
        .find({ createdBy: req.params.id })
    res.send({ results });

})
router.get('/fundrisers/:id', async (req, res) => {
    Fundriser.find({ _id: req.params.id }).then(result => {
        res.send(result)
    }).catch((err) => {
        res.send(err);
    })
})
router.put('/fundrisers/user/:id/edit/:fund_id',userAuth, async (req, res) => {
    Fundriser.updateOne(
        {
            _id: req.params.fund_id
        },
        {
            $set: req.body
        }
    ).then(result => {
        res.send(result)
    }).catch((err) => {
        res.send(err);
    })
})
router.put('/fundrisers/:id', adminAuth, async (req, res) => {
    Fundriser.updateOne({ _id: req.params.id }, { $set: { featured: req.body.featured } }).then(result => {
        res.send(result)
    }).catch((err) => {
        res.send(err);
    })
})
router.get('/fundrisers/donations/:id', async (req, res) => {
    let sum = 0;
    await Donation.aggregate([
        { $match: { donationTo: req.params.id } },
        { $group: { _id : req.params.id, sum : { $sum: "$amount" } } }])
        .then((res)=>{
            console.log(res);
            sum = res[0].sum;
    });
    await Donation.find({ donationTo: req.params.id }).then(result => {
        res.send({result,sum})
    }).catch((err) => {
        res.send(err);
    })
})
router.delete('/fundrisers/:id', adminAuth, async (req, res) => {
    Fundriser.deleteOne({ _id: req.params.id }).then(() => {
        res.send({ success: true })
    }).catch((err) => {
        res.send(err);
    })
})
router.get('/fundrisers/image/:id', async (req, res) => {
    try {
        const fundriser = await Fundriser.findById(req.params.id)

        res.set('Content-Type', 'image/png')
        res.send(fundriser.thumbnail)
    } catch{
        res.send('error')
    }
})
module.exports = router