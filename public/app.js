/* global $ */
$(document).ready(()=>{
    $.getJSON('/api/todos')
    .then((data)=>{
        for(var i=0;i<data.length;i++){
            console.log(data[i]);
            var newTodo = $("<li>"+data[i].name+"<span>X</span></li>");
            newTodo.addClass('task');
            newTodo.data('id',data[i]._id);
            newTodo.data('completed',data[i].completed);
            if (data[i].completed){
                newTodo.addClass("done");
            }
            $('.list').append(newTodo);
        }
    });
    
    $('#todoInput').keypress((e)=>{
        if (e.which == 13){
            var value = $('#todoInput').val();
            $('#todoInput').val('');
            $.post('/api/todos',{name:value})
            .then((data)=>{
            var newTodo = $("<li>"+data.name+"<span>X</span></li>");
                newTodo.addClass('task');
                newTodo.data('id',data._id);
                newTodo.data('completed',data.completed);
                if (data.completed){
                    newTodo.addClass("done");
                }
                $('.list').append(newTodo);
        });
            }
    });
    
    $('.list').on("click",'span',function(e){
        e.stopPropagation();
        var id = $(this).parent().data('id');
        
        $.ajax({
            method:"delete",
            url:"/api/todo/"+id
        })
        .then((data)=>{
            $(this).parent().remove();
        })
        .catch((err)=>{
            console.log(err);
        });
    });
    
    $('.list').on('click','li',function(){
        var id = $(this).data('id');
        var isDone = $(this).data("completed");
        var updateData = {"completed": !isDone};
        $.ajax({
            method:'put',
            url:'/api/todo/'+id,
            data:updateData
        })
        .then((data)=>{
            // console.log("Data is : ");
            // console.log(data);
          $(this).data('completed',!isDone); 
           $(this).toggleClass('done');
        });
    });

});