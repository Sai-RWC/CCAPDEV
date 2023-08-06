import { Router } from "express";
import { User } from "../models/user.js";
import { Post } from "../models/post.js";
import { Comment } from "../models/comment.js";

import loginRouter from "./loginRouter.js";
import signUpRouter from "./signUpRouter.js";
import searchQueryRouter from "./searchQueryRouter.js";
import userPageRouter from "./userPageRouter.js";
import signOutRouter from "./signOutRouter.js";

const router =  Router();

router.get('/', async (req, res) => {
  const user = await User.find({}).lean().exec();
  const currentUser = await User.findOne({username: process.env.CURRENTUSER}).lean().exec();
  // console.log(`currentUser: ${currentUser}`);
  // console.log(`CURRENTUSERID: ${process.env.CURRENTUSERID}`);
  const posts = await Post.find({}).populate('user').lean().exec();
  // console.log("Process Val: " + process.env.ISLOGGEDIN);
  res.render('index', {
    title: "Home Page",
    user: user,
    posts: posts,
    isLoggedIn: process.env.ISLOGGEDIN,
    currentUser: currentUser
  });
});

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

export default router;
