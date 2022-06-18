const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const passport = require('passport');
const { isLoggedIn } = require('../middleware');




router.get('/comment', async(req, res) => {
    
    const comments = await Comment.find({});
    console.log(comments);
    res.render('home',{comments});
});


router.post('/post/comment',isLoggedIn,async(req,res)=>{
    Post.findById(req.body.post,async function(err,post){
        if(post){
            Comment.create({
                content: req.body.content,
                post:req.body.post,
               // user:req.user._id
            },function(err,comment){
                //handle err
                post.comments.push(comment);
                post.save();

                res.redirect('/post');
            });
        }
    });
});

//   router.post('/post/comment',isLoggedIn, async(req, res) => {
        
          
//             try{
    
//             const newComment = {
//                 ...req.body
//             }
    
           
    
            
//              await Comment.create.save(newComment);
    
           
    
            
//         res.redirect('/post');
//             }
//             catch(e)
//             {
//                 res.redirect('/error');
//             }
// });
module.exports = router;

    
    


