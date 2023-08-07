import { Router } from "express";
import { User } from "../models/user.js";
import { Post } from "../models/post.js";
import { Comment } from "../models/comment.js";

import loginRouter from "./loginRouter.js";
import signUpRouter from "./signUpRouter.js";
import searchQueryRouter from "./searchQueryRouter.js";
import userPageRouter from "./userPageRouter.js";
import signOutRouter from "./signOutRouter.js";
import passport from "passport";
// import initialize from "../config/passport-config.js";


const router =  Router();

router.get('/', checkAuthenticated, async (req, res) => {
  // const users = await User.find({}).lean().exec();
  // const currentUser = await User.findOne({username: process.env.CURRENTUSER}).lean().exec();
  if (req.isAuthenticated()) {
    console.log('User is Authenticated');
  }
  else {
    console.log('User is not yet auth');
  }
  // console.log(`User: ${req.user.name}`);
  // console.log(`currentUser: ${currentUser}`);
  // console.log(`CURRENTUSERID: ${process.env.CURRENTUSERID}`);
  const posts = await Post.find({}).populate('users').lean().exec();
  // console.log("Process Val: " + process.env.ISLOGGEDIN);
  const user = req.user.toObject();
  console.log(`currentUser: ${req.user}`);
  res.render('index', {
    title: "Home Page",
    user: user,
    posts: posts,
    isLoggedIn: req.isAuthenticated(),
    currentUser: user
  });
});

router.get('/', async (req, res) => {
  const user = await User.find({}).lean().exec();
  const posts = await Post.find({}).populate('user').exec();

  res.render('index', {
    title: "Home Page",
    user: user,
    posts: posts
  });
})

// router.get('/signout', async (req, res) => {
//   req.logout()
//   res.redirect(302, '/');
// })

// router.post('/getComment' async (req, res) => {
//   const user = await.
// })

router.use(loginRouter);
router.use(signUpRouter);
router.use(searchQueryRouter);
router.use(userPageRouter);
router.use(signOutRouter);

router.use((req, res) => {
  res.render('error', {
    err_message: "Invalid Link"
  });
})


// function checkAuth(req, res, next) {
//   try {
//     if (req.isAuthenticated()) {
//       return next();
//     }
//     
//   } catch (error) {
//     console.error(error);
//   }
// }

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

export default router;
