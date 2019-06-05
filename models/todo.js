var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/todoApp",{useNewUrlParser:true});

var schema = new mongoose.Schema({
    name:{
        type:String,
        required:"Name is required"
    },
    completed:{
        type:Boolean,
        default:false
    },
    date_created:{
        type :Date,
        default:Date.now
    }
});

var todo = mongoose.model('todo',schema);
module.exports = todo