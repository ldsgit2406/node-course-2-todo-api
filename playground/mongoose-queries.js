const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');

var id = '5c1dd66009ca8946bdb3b6e7';
var userId = '5bcb3ce1380e5511b461638a';

// Todo.find({_id : id}).then((todos) => {
//   console.log('Todos', todos);
// })
//
//
// Todo.findOne({_id : id}).then((todo) => {
//   console.log('Todo', todo);
// })

Todo.findById(id).then((todo) => {
  if(!todo){
    console.log('Id not found');
  }else{
    console.log('Todo By ID ', JSON.stringify(todo, undefined, 2));
  }

}).catch((e) => console.log(e));

User.findById(userId).then((user) => {
  if(!user){
    console.log('user not found');
  } else {
    console.log('User by id ', JSON.stringify(user, undefined, 2));
  }
}).catch((e) => console.log(e));
