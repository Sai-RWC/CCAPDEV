import { Router } from "express";
import { User } from "../models/user.js";
import bcrypt from 'bcrypt';

const signUpRouter = Router();
var accountQuery;
const title = "Sign Up";

signUpRouter.get('/signup', checkNotAuthenticated, (req, res) => {
  res.render('signup', {
    title: 'Sign Up',
  });
});

signUpRouter.post('/createAccount', async (req, res) => {
  try {
    console.log("/createAccount request received");
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    console.log(`hashedPass: ${hashedPass}`);
    const newUser = new User({
      username: req.body.username,
      password: hashedPass
    });
    newUser.save().then(results => {
      alert('Account Successfully created');
      console.log(`${newUser.username} successfully created`);
      res.status(200).json({success: true});
      return res.redirect(302, '/login');
    }).catch(err => {
        if (err.name === "MongoServerError" && err.code === 11000) {
          // 300 => username is already taken
          res.status(300).json({
            sucess: false, 
            error1: "Username is already taken",
            error2: ""
          });
          console.log("User is already taken");
        }
        // console.log(err.name)
        // console.log("Error is called");
        // console.error(err);
        // res.render('signup', {
        //   title: title,
        //   error1: "Account Username already Taken",
        //   error2: ""
        // });
      });
  } catch (error) {
    res.redirect(303, '/register')
    console.error(error)
  }
});

// Catching mongoDB document insert error
// https://stackoverflow.com/questions/30593882/how-to-catch-the-error-when-inserting-a-mongodb-document-which-violates-an-uniqu

//   await User.findOne({username: req.body.username}, (err, user) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     if (user) {
//       res.render('signup', {
//         title: title,
//         error1: "Account Username already Taken",
//         error2: 
//       });
//     }
//     else {
//       res.render('login', {
//         title: "Login",
//         alert: "Account Successfully Created"
//       });
//     }
//   })
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

export default signUpRouter;
