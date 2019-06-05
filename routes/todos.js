var express = require("express");
var mongoose = require('mongoose');
var router = express.Router();
var db = require('../models');
mongoose.connect("mongodb://localhost:27017/todoApp",{useNewUrlParser:true});

router.get("/api/todos",(req,res)=>{
    db.Todo.find()
    .then((allTodo)=>{
        // console.log("hi");
        res.json(allTodo);
    })
    .catch((err)=>{
        // console.log(err);
        res.send(err);
    });
});


router.post('/api/todos',(req,res)=>{
    console.log(req.body);
    db.Todo.create(req.body)
    .then((newTodo)=>{
      res.json(newTodo);
    })
    .catch((err)=>{
        res.send(err);
    });
});

router.get('/api/todo/:todoId',(req,res)=>{
    db.Todo.findById(req.params.todoId)
    .then((currentTodo)=>{
        res.json(currentTodo);
    })
    .catch((err)=>{
        res.send(err);
    });
});


router.put('/api/todo/:todoId',(req,res)=>{
    db.Todo.findOneAndUpdate({_id:req.params.todoId},req.body,{new:true})
    .then((updatedTodo)=>{
        res.json(updatedTodo);
    })
    .catch((err)=>{
        res.send(err);
    });
});

router.delete('/api/todo/:todoId',(req,res)=>{
   db.Todo.findByIdAndRemove(req.params.todoId)
   .then((deletedTodo)=>{
       console.log(deletedTodo);
       res.json(deletedTodo);
   })
   .catch((err)=>{
       res.send(err);
   });
});

module.exports = router;