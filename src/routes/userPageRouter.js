import { Router } from "express";
import { User } from "../models/user.js";
import { Post } from "../models/post.js";
import { Comment } from "../models/comment.js";

const userPageRouter = Router();

userPageRouter.get('/u/:userName', async (req, res) => {
  let currentUser = null;
  const user = await User.findOne({username: req.params.userName}).lean().exec();
  if(req.isAuthenticated()) {
    currentUser = req.user.toObject();
  }
  if (user){
    console.log("User:");
    console.log(user);
    const posts = await Post.find({user: user._id}).populate('user').lean().exec();
    console.log(posts);
    const comments = await Comment.find({}).populate('user').populate('post').lean().exec();
    console.log(currentUser);
    res.render('user', {
      title: "Profile",
      user: user,
      posts: posts,
      comments: comments,
      currentUser: currentUser,
      isLoggedIn: req.isAuthenticated()
    });
  }
  else{ 
    res.render('error', {
      err_message: "User does not exist"
    });
  }

  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      // return next()
      console.log('User is authenticated');
    }

    res.redirect('/login')
    // return next();
  }

  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next();
  }

});

export default userPageRouter;
