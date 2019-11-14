const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/users')
const fundriserRouter = require('./routers/fundrisers')
const app = express();
const port = process.env.PORT;
app.use(express.json())
app.use(userRouter)
app.use(fundriserRouter)
// app.use((req, res, next) =>{
//     console.log(req.method, req.path)
//     next()
// })

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.listen(port, ()=>{
    console.log('Server is on port'+port);
})
