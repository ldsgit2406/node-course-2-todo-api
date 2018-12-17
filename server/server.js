var express = require('express');
var bodyParser = require ('body-parser');

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

app.listen(3000, () => {
  console.log('Server is listening at port 3000');
})

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
