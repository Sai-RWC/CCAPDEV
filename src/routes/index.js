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


const router = Router();
// router.get('/', checkAuthenticated, async (req, res, next) => {
//   let user = null;
//
//   // Check if the user is authenticated using the checkAuthenticated middleware
//   if (req.isAuthenticated()) {
//     console.log('User is Authenticated');
//     // Convert the 'req.user' object to a plain JavaScript object
//     try {
//       user = req.user.toObject();
//     } catch (error) {
//
//       console.error(error);
//     }
//   } else {
//     console.log('User is not yet auth');
//   }
//
//   // Fetch posts from the database, populating the 'user' field
//   const posts = await Post.find({}).populate('user').lean().exec();
//
//
//   // Log the 'req.user' object and render the 'index' page
//   console.log(`currentUser: ${req.user}`);
//   res.render('index', {
//     title: "Home Page",
//     user: user,
//     posts: posts,
//     isLoggedIn: req.isAuthenticated(),
//     currentUser: user
//   });
// });
// router.get('/', checkAuthenticated, async (req, res) => {
//   // const users = await User.find({}).lean().exec();
//   // const currentUser = await User.findOne({username: process.env.CURRENTUSER}).lean().exec();
//   if (req.isAuthenticated()) {
//     console.log('User is Authenticated');
//   }
//   else {
//     console.log('User is not yet auth');
//   }
//   // console.log(`User: ${req.user.name}`);
//   // console.log(`currentUser: ${currentUser}`);
//   // console.log(`CURRENTUSERID: ${process.env.CURRENTUSERID}`);
//   const posts = await Post.find({}).populate('user').lean().exec();
//   // console.log("Process Val: " + process.env.ISLOGGEDIN);
//   // const user = null;
//   const user = req.user.toObject();
//   try {
//     const user = req.user.toObject();
//     
//   } catch (error) {
//     console.error(error);
//     const user = null;
//   }
//   console.log(`currentUser: ${req.user}`);
//   res.render('index', {
//     title: "Home Page",
//     user: user,
//     posts: posts,
//     isLoggedIn: req.isAuthenticated(),
//     currentUser: user
//   });
// });

router.get('/', async (req, res) => {
  let user = null;

  // Check if the user is authenticated using the checkAuthenticated middleware
  if (req.isAuthenticated()) {
    console.log('User is Authenticated');
    var posts = await Post.find({}).populate('user').lean().exec();

    // Convert the 'req.user' object to a plain JavaScript object
    console.log(`user: ${req.user}`);
      user = req.user.toObject();
  } 
  else {
    console.log('User is not yet auth');
    var posts = await Post.find({}).limit(15).populate('user').lean().exec();
  }

  // const posts = await Post.find({}).populate('user').lean().exec();
  // const user = await User.find({}).lean().exec();
  // console.log('Unauth got called');

  res.render('index', {
    title: "Home Page",
    // user: user,
    posts: posts,
    isLoggedIn: req.isAuthenticated(),
    currentUser: user
  });
});


router.post('/postText', async (req, res) => {
  console.log('/postText is called');
  const user = req.user.toObject();
  const newPost = new Post({
    user: user._id,
    message: req.body.message
  });
  newPost.save().then(results => {
    console.log('Post successfully saved');
    res.status(200).json({success: true});
    // reload the page
  }).catch(err => {
      console.log(err);
    })
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
    // return next()
    console.log('User is authenticated');
  }
  else {
    res.redirect('/login')
  }

  // return next();
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next();
}

export default router;
