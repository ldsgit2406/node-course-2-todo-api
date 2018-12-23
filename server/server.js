var express = require('express');
var bodyParser = require ('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {User} = require('./models/user.js');
var {Todo} = require('./models/todo.js');

var app = new express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text : req.body.text
  })

  todo.save().then((doc) =>{
    res.send(doc);
  },(e) => {
    res.status(400).send(e);
  })
  console.log(req.body);
})

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  },(e) => {
    res.status(400).send(e);
  })
})

app.get('/todos/:id', (req , res) => {
  var todoid = req.params.id;

  var isValid = ObjectID.isValid(todoid);
  if(!isValid){
    res.status(400).send('TODO ID not valid');
  }

  Todo.findById(todoid).then((todo) => {
    if(!todo){
      res.status(404).send('TODO ID not valid');
    }else{
      res.status(200).send(JSON.stringify(todo, undefined, 2));
    }
  }).catch((e) => res.status(400).send(e));

})

app.listen(3000, () => {
  console.log('Server is listening at port 3000');
})

module.exports = {app};

// var newUser = new User({
//   name : 'Dhanasekar  Try1  ',
//   email : 'ldsx1@xxx.com'
// })
//
// newUser.save().then((doc)=> {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
//   console.log('Unable to save new to do ', err);
// })
