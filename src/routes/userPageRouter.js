import { Router } from "express";
import { User } from "../models/user.js";
import { Post } from "../models/post.js";
import { Comment } from "../models/comment.js";

const userPageRouter = Router();

userPageRouter.get('/u/:userName', async (req, res) => {
  const user = await User.findOne({username: req.params.userName}).lean().exec();
  if (user){
    console.log("User:");
    console.log(user);
    const posts = await Post.find({user: user._id}).populate('user').lean().exec();
    console.log(posts);
    const comments = await Comment.find({}).populate('user').populate('post').lean().exec();
    const currentUser = req.user.toObject();
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
  // console.log("Comments:");
  // console.log(comments);
  // console.log("all posts:");
  // console.log(await Post.find({}).lean().exec());

});

export default userPageRouter;
