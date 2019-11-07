const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databseName = 'test'
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) =>{
    if(error)
      return console.log('error');
    console.log('connected');

    const db = client.db(databseName);
    db.collection('users').insertOne({
        name: 'kire',
        age:27
    })
})