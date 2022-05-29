const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');


// To get the signup form
router.get('/register', (req, res) => {
    res.render('auth/signup');
});

// Registering the user

router.post('/register', async (req, res) => {
    
    try {
        const user = {
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            username: req.body.username
        }
       
        const newUser = await User.register(user, req.body.password);
        req.flash('success', `Welcome ${firstname},Please login to continue!`);
        res.redirect('/login');
        //res.status(200).send(newUser);
    }
    catch (e) {

        req.flash('error', e.message);
        res.redirect('/register');
    }  
});

// To get the login page
router.get('/login', (req, res) => {
    res.render('auth/login',{message:req.flash("success")});
})

// Login the user

router.post('/login', passport.authenticate('local',
    {
        failureRedirect: '/login',
    }), (req, res) => {
        const { firstname } = req.user;
        req.flash('success', `Welcome Come Back ${firstname} Again!!`);
        res.redirect('/post');
});
    

// Logout

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logout out Successfully!!!');
    res.redirect('/login');
})


module.exports = router;
///////////////////////////////





// router.get('/fakeuser', async(req, res) => {
    
//     const user = new User({
//         username: 'sabeel',
//         email: 'sabeel@gmail.com'
//     });

//     const newUser = await User.register(user,'sabeel12')

//     res.send(newUser);
// })

// Get the signup form



// register the new user in the db

// get the login page







