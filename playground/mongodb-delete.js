//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err){
    return console.log('unable to connect to Mongo DB server');
  }
  console.log('Connected to Mongo DB server');

  const db = client.db('TodoApp');

  // delete Many
  // db.collection('Todos').deleteMany({text : 'Eat lunch'}).then((result) => {
  //   console.log(JSON.stringify(result, undefined, 2));
  // });

  // delete done
  // db.collection('Todos').deleteOne({text : 'Eat lunch'}).then((result) => {
  //   console.log(JSON.stringify(result, undefined, 2));
  // });

  // findone and delete one
  // db.collection('Todos').findOneAndDelete({text : 'Eat lunch'}).then((result) => {
  //   console.log(JSON.stringify(result, undefined, 2));
  // });

  db.collection('Users').deleteMany({name : 'Dhanasekar123'}).then((result) => {
     console.log(JSON.stringify(result, undefined, 2));
  });

  db.collection('Users').findOneAndDelete({_id : new ObjectID('5bc4bb991b66ba102c7efe9d')}).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  })

  //client.close();
});
