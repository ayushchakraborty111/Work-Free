const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const { isLoggedIn } = require('../middleware');
const User = require('../models/user');
const Comment = require('../models/comment');
const fs= require('fs');
const path= require('path');



router.get('/user', async(req, res) => {
    
        const users = await User.find({});
        console.log(users);
        res.render('home',{users});
    });

    router.get('/user/profile/:id', async (req, res) => {

            
           const { id } = req.params;
            // inflating the foundproduct with the reviews array using populate
            const user = await User.findById(id)
            res.render('userProfile',{user});
            
        
    });
    router.patch('/user/profile/:id',isLoggedIn, async (req, res) => {
    
       console.log(req.params.id);
        if(req.user.id==req.params.id)
        {
            try{
                const updatedProfile = req.body;
                const { id } = req.params;
 
           let user=await User.findByIdAndUpdate(id, updatedProfile);
           User.uploadedAvatar(req,res,function(err){
                   if(err)
                   {
                           console.log('multer err',err);
                   }
                  // console.log(req.file);
                  user.firstName=req.body.firstName;
                  user.email = req.body.email;
                  if(req.file)
                  {
                      if(user.avatar){
                         fs.unlinkSync(path.join(__dirname, '..', user.avatar))
                      }
                          //this is saving the path of the uploaded file into the avatar field in the user
                          user.avatar=User.avatarPath + '/' + req.file.filename 
                  }
                  user.save();
                  return res.redirect(`/user/profile/${id}`);
           });
            }
            catch(err)
            {
               console.log(err);
            }
        }
       
    });








module.exports = router;