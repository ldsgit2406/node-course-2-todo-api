var mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{
  text: {
    type : String,
    required : true, // validation rule for required
    minlength : 1, // validatin rule for length to be atlease 1
    trim : true   // trims the text before validation and stores it
  },
  completed: {
    type : Boolean,
    default : false // default value for the completed field
  },
  completedAt : {
    type : Number,
    default : null
  }
});

module.exports = {Todo};
