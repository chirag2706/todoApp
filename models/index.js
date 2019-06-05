var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/todoApp",{useNewUrlParser:true});
mongoose.Promise = Promise;

module.exports.Todo = require('./todo.js');