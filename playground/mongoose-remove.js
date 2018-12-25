const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');
const {ObjectID} = require('mongodb');


Todo.remove({}).then((result) => {
  console.log(result);
})

Todo.findOneAndRemove({})

Todo.findByIdAndRemove('asdf').then((todo) => {
  console.log(todo);
})
