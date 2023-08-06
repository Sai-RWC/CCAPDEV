import { Router } from "express";
import { User } from "../models/user.js";
import { Post } from "../models/post.js";

const searchQueryRouter = Router();

// https://stackoverflow.com/questions/43729199/how-i-can-use-like-operator-on-mongoose
searchQueryRouter.get('/q/:query', async (req, res) => {
  const searchQuery = req.params.query;
  const users = await User.find({username: {$regex: '.*' + searchQuery + '.*'}}).lean().exec();
  const posts = await User.find({message: {$regex: '.*' + searchQuery + '.*'}}).lean().exec();
  // const users = await User.find({username: req.params.query});
  // const posts = await User.find({username: req.params.query});
  res.render('search', {
    title: "Search",
    users: users,
    posts: posts
  });
});

searchQueryRouter.post('/searchQuery', async (req, res) => {
  const searchQuery = req.body.searchQuery;
  const users = await User.find({username: {$regex: '.*' + searchQuery + '.*'}}).lean().exec();
  const posts = await User.find({message: {$regex: '.*' + searchQuery + '.*'}}).populate('user').lean().exec();
  res.render('search', {
    title: "Search",
    users: users,
    posts: posts
  });
});

export default searchQueryRouter;
