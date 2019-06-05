var express = require("express");
var app = express();
var mongoose = require('mongoose');
var mainRoutes = require('./routes/todos.js');
var bodyParser = require('body-parser');
mongoose.connect("mongodb://localhost:27017/todoApp",{useNewUrlParser:true});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/views'));
//routes
app.get('/',(req,res)=>{
    res.sendFile("index.html");
})
app.use('/',mainRoutes);

app.listen(process.env.PORT,process.env.IP,()=>{
console.log("Server has started with "+process.env.PORT); 
});