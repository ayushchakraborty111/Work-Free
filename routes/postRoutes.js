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


    try {

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
        
        req.flash('success', 'Post added successfully');
        res.redirect('/post');

    }

    catch(e){
        req.flash('error', 'oops, something went wrong');
        res.redirect('/post');
    }
    
    
});

//delete a post
router.delete('/post/:id',isLoggedIn, async (req, res) => {

         
           //.id means converting the object id into string
       
           
           try {

            const { id } = req.params;
        
            console.log(Post.postedBy);
            console.log(User.Name);
              await Post.findOneAndDelete(id);
              req.flash('success', 'product deleted successfully');
              res.redirect('/post');
              console.log("delete");

           }

           catch(e) {
                req.flash('error', 'oops, something went wrong');
                res.redirect('/post');
           }

        
         
        
        
        
         

    
});





module.exports = router;