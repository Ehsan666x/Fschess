var express=require('express');
var livegamesrouter=express.Router();

// livegamesrouter.get('/',function(req,res){
//     res.render('index')
// })

// livegamesrouter.get('/profiles',function(req,res){
//     res.render('profile_index')
// })
livegamesrouter.get('/',function(req,res,next){
    res.render('livegames_index')
    next();
})
livegamesrouter.get('/:id',function(req,res,next){
    res.render('livegames_index') 
    next(); 
})

module.exports=livegamesrouter;