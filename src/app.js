const express = require('express');

const app = express();

app.get('', (req, res) =>{
    console.log('object');
    res.send('hello')
})
app.listen(3000, () =>{
    console.log('server is listening on port 3000');
})