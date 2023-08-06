import { Router } from "express";
import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
// import { Post } from "../models/post.js";

const loginRouter = Router();  
var isLoggedIn = false;
var existingAcc;
const title = "Login";

loginRouter.get('/login', (req, res) => {
  res.render('login', {
    title: title
  });
});

loginRouter.post('/loginUser', async (req, res) => {
  console.log("/loginUser request received");
  // https://stackoverflow.com/questions/45172700/what-does-mongoose-return-when-a-find-query-is-empty
  try {
    const userAccount = await User.findOne({username: req.body.username}).lean().exec();
    if (userAccount){
      console.log("Username is found")
      // const hashedPass = await bcrypt.hash(req.body.password, 10);
      // console.log(`hashed: ${hashedPass}`);
      if (await bcrypt.compare(req.body.password, userAccount.password)) {
        console.log("User successfully logged in")
        process.env.CURRENTUSER = userAccount.username;
        console.log(`username: ${userAccount.username}`)
        console.log(`loginRouter CURRENTID: ${process.env.CURRENTUSERID}`);
        // return res.sendStatus(200).json({success: true});
        return res.redirect(302, '/');
      } 
      // Follow statuscode 301~308
      else {
        console.log('Incorrect Pass');
        return res.status(300).json({
          success: false, 
          error1: '',
          error2: 'Incorrect Password'});
        // return res.sendStatus(300).json({success: false, msg: 'Incorrect Password'});
        //   res.render('login', {
        //   title: title,
        //   error1: "",
        //   error2: "Password is incorrect"
        // });
      }
    }
    else {
      console.log('Username does not exists');
      return res.status(301).json({
        success: false,
        error1: 'Username does not exist',
        error2: ''})
    }
  } catch (error) {
    console.error(error)
    return res.redirect('/login')
  }
  // const users = await User
  // const posts = await Post.find({})

  // if (userAccount) {
  //   if (req.body.password == userAccount.password){

  
  // if(1){
  //   if (1){
  //     process.env.ISLOGGEDIN = true;
  //     // console.log("Process:");
  //     // console.log(process.env.isLoggedIn);
  //   res.redirect(301, '/', {
  //     title: "Home",
  //     isLoggedIn: process.env.ISLOGGEDIN,
  //     });
  //   }
  // }

//   await User.findOne({username: req.body.username}, (err, user) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     if (user) {
//       if (1){
//         isLoggedIn = true;
//         process.env.ISLOGGEDIN = 1;
//         res.redirect('/', {
//           title: "Home",
//           isLoggedIn: process.env.ISLOGGEDIN,
//         })
//       }
//       else {
//         res.render('login', {
//           title: "Login",
//           error1: null,
//           error2: "Invalid Password"
//         });
//       }
//     }
//     else { 
//       res.render('login', {
//         title: "Login",
//         error1: "Account Does not Exists",
//         error2: null
//       })
//     }
//   }).lean().exec()
// });
});

export default loginRouter;
