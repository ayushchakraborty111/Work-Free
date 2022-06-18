const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const { isLoggedIn } = require('../middleware');
const User = require('../models/user');
const Comment = require('../models/comment');



// To get the signup form
router.get('/post', async(req, res) => {
    
        const posts = await Post.find({}).populate('postedBy').populate({
            path: 'comments',
            populate: {
                path:'user'
            }
        });
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
   if(req.xhr){
    return res.status(200).json({
        data: {
            post: post
        },
        message: "Post created!"
    });
}

    const newPost=await Post.create(post);
    
   
    res.redirect('/post');
});

//delete a post
router.delete('/post/:id',isLoggedIn, async (req, res) => {

         
           //.id means converting the object id into string
        
        const { id } = req.params;
        
      console.log(Post.postedBy);
      console.log(User.Name);
        await Post.findOneAndDelete(id);
       
        res.redirect('/post');
         
        
        
        
         //console.log("delete");

    
});





module.exports = router;