const express = require('express')
const socketio = require('socket.io')
const path = require('path')
require('./db/mongoose')
var cors = require('cors')
const http = require('http')
const userRouter = require('./routers/users')
const fundriserRouter = require('./routers/fundrisers')
contract = require('./routers/web3/ropstenConnect')
const app = express();

const server = http.createServer(app)
io = socketio(server)

const port = process.env.PORT;

const publicdirectory = path.join(__dirname, './public')

app.use(express.static(publicdirectory))
app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(fundriserRouter)
// app.use((req, res, next) =>{
//     console.log(req.method, req.path)
//     next()
// })


io.on('connection',(socket) =>{
    contract.events.Deposit({
        // filter: {myIndexedParam: [20,23]},
        fromBlock: 'latest',
        toBlock: 'latest'
    }).on('data', function(event) {
        console.log(event.returnValues);
        socket.emit('countupdatednetwork', event.returnValues)
    }).on('error', console.error);
    console.log('connected');
    socket.emit('countupdated')
})

server.listen(port, ()=>{
    console.log('Server is on port'+port);
})
