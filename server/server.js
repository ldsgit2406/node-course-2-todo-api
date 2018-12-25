var express = require('express');
var bodyParser = require ('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {User} = require('./models/user.js');
var {Todo} = require('./models/todo.js');

const _ = require('lodash');

var app = new express();
const port = process.env.PORT || 3000;

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

app.delete('/todos/:id', (req, res) => {
  //get the id
  var id = req.params.id;
  console.log(id);
  if(!ObjectID.isValid(id)){
    res.status(400).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo){
      res.status(404).send();
    }
    // send success message and todo back
    res.status(200).send(todo);
  }).catch((e) => {
      res.status(404).send();
  })

});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});



app.listen(port, () => {
  console.log(`started up at port ${port}`);
});

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
