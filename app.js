const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const Post = require('./models/post');
//const Comment = require('./models/comment');
const flash = require('connect-flash');
const {isLoggedIn} = require('./middleware');




mongoose.connect('mongodb://localhost:27017/twitter-clone')
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));






app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes 

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');



//midle ware for session to create session id in browser
const sessionConfig = {
    name: "rest",
    secret: 'weneedsomebettersecret',
    resave: false,
    saveUninitialized: true,
    
}
//middleware
app.use(session(sessionConfig));
app.use(flash());



app.use(passport.initialize());
app.use(passport.session());

//for authentication
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
})


app.get('/', isLoggedIn,(req, res) => {
    res.render('home');
})


// Routes
app.use(authRoutes);
app.use(postRoutes);
app.use(commentRoutes);






app.listen(3000, () => {
    console.log("Server running at port 3000");
})