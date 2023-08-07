import { Router } from "express";
import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import passport from "passport";


  const loginRouter = Router();  
  var isLoggedIn = false;
  var existingAcc;
  const title = "Login";

  // initialize(passport, username => User.findOne({username: username}));

  loginRouter.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login', {
      title: title
    });
  });

  // loginRouter.post('/loginUser', async (req, res) => {
  //   console.log("/loginUser request received");
  //   try {
  //     const userAccount = await User.findOne({username: req.body.username}).lean().exec();
  //     initialize(passport, userAccount);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });
  // loginRouter.post('/loginUser', passport.authenticate('local'));

loginRouter.post('/loginUser', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

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

export default loginRouter;
