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
  // loginRouter.post('/loginUser', (req, res) => {
  //   console.log('/loginUser request received');
  //   passport.authenticate('local', (err, user, info) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     if (!user) {
  //       console.log('Incorrect user or !user is called');
  //       if (info.status === 400) {
  //         console.log('Status 400 is returned');
  //         return res.status(300).json({
  //           success: false,
  //           error1: info.message,
  //           error2: ''
  //         });
  //       }
  //       else if (info.status === 401) {
  //         console.log('Status 401 is returned');
  //         return res.status(301).json({
  //           success: false,
  //           error1: '',
  //           error2: info.message
  //         });
  //       }
  //       return res.status(300).json({
  //         success: false,
  //         error1: info.message,
  //         error2: ''
  //       });
  //     }
  //     // console.log(`info ${info.status}`);
  //     req.logIn(user, err => {
  //       console.log(`currentUser: ${user}`);
  //       console.log(`isAuth = ${req.isAuthenticated()}`);
  //       if (err) {
  //         console.error(`error: ${er}`);
  //       }
  //     });
  //     console.log('Successful login');
  //     return res.redirect(302, '/');
  //   })(req, res);
  //   // res.redirect(302, '/')
  // });

  // loginRouter.post('/loginUser', async (req, res) => {
  //   console.log("/loginUser request received");
  //   // https://stackoverflow.com/questions/45172700/what-does-mongoose-return-when-a-find-query-is-empty
  //   try {
  //     // const userAccount = await User.findOne({username: req.body.username}).lean().exec();
  //   initialize(passport, async username => {await User.findOne({username: req.body.username}).lean().exec()})
  //     if (userAccount){
  //       console.log("Username is found")
  //       // const hashedPass = await bcrypt.hash(req.body.password, 10);
  //       // console.log(`hashed: ${hashedPass}`);
  //       if (await bcrypt.compare(req.body.password, userAccount.password)) {
  //         console.log("User successfully logged in")
  //         process.env.CURRENTUSER = userAccount.username;
  //         console.log(`username: ${userAccount.username}`)
  //         console.log(`loginRouter CURRENTID: ${process.env.CURRENTUSERID}`);
  //         // return res.sendStatus(200).json({success: true});
  //         
  //         return res.redirect(302, '/');
  //       } 
  //       // Follow statuscode 301~308Unexpected token 'export'
  //       else {
  //         console.log('Incorrect Pass');
  //         return res.status(300).json({
  //           success: false, 
  //           error1: '',
  //           error2: 'Incorrect Password'});
  //         // return res.sendStatus(300).json({success: false, msg: 'Incorrect Password'});
  //         //   res.render('login', {
  //         //   title: title,
  //         //   error1: "",
  //         //   error2: "Password is incorrect"
  //         // });
  //       }
  //     }
  //     else {
  //       console.log('Username does not exists');
  //       return res.status(301).json({
  //         success: false,
  //         error1: 'Username does not exist',
  //         error2: ''})
  //     }
  //   } catch (error) {
  //     console.error(error)
  //     return res.redirect('/login')
  //   }
  // });
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
