const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const { isLoggedIn } = require('../middleware');
const User = require('../models/user');



// To get the signup form
router.get('/post', async(req, res) => {
    
        const posts = await Post.find({}).populate('postedBy');
       //  console.log(posts);
         res.render('home',{posts});
});


//create a post
router.post('/post',isLoggedIn,async(req, res) => {

    const post = {
        postedBy: req.user._id,
        content:req.body.content
    }
   // console.log(post)

    const newPost=await Post.create(post);
    
   
    res.redirect('/post');
});


//delete a post
router.get('/destroy/:id',isLoggedIn,async(req, res) =>{

})





module.exports = router;