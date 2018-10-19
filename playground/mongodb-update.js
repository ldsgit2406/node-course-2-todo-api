//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err){
    return console.log('unable to connect to Mongo DB server');
  }
  console.log('Connected to Mongo DB server');

  const db = client.db('TodoApp');

  db.collection('Todos').findOneAndUpdate({
    _id : new ObjectID('5bc4c832a0bebf15228aa272')
  },{
    $set: {
      completed : true
    }
  },{
    returnOriginal : false
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  })

  db.collection('Users').findOneAndUpdate({
    name :'Dhanasekar'
  },{
    $set: {
      name :'Dhanasekar Lingakumar'
    },
    $inc : {
      age : 1
    }
  },{
    returnOriginal : false
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  })

  //client.close();
});
