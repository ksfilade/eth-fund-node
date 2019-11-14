const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/users')
const fundriserRouter = require('./routers/fundrisers')
const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(fundriserRouter)
// app.use((req, res, next) =>{
//     console.log(req.method, req.path)
//     next()
// })

app.listen(port, ()=>{
    console.log('Server is on port'+port);
})
