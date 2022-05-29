const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const passport = require('passport');
const { isLoggedIn } = require('../middleware');




router.get('/comment', async(req, res) => {
    
    const comment = await Comment.find({});
   //  console.log(posts);
     res.render('home',{comment});
});



    router.post('/comments',isLoggedIn, async (req, res) => {
    
        const newComment = {
            ...req.body
        }
    
        await Comment.create(newComment);
        
        res.redirect('/post');
});
module.exports = router;

    
    


