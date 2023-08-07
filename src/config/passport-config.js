import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user.js";
import bcrypt from 'bcrypt';


function initialize(passport)  {
  const authenticateUser = async (username, password, done) => {
    // console.log(`usernamereq: ${username}`)
    // console.log(`passwordreq: ${password}`)
    // const user = await getUserByUserName(username)
    const user = await User.findOne({username: username});
    // console.log(`${user.username}`);
    if (user == null) {
      return done(null, false, {status: 400, message: "User is not found"});
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        console.log('Password is correct');
        return done(null, user)
      }
      else {
        return done(null, false, {status: 401, message: "Incorrect password"})
      }

    } catch (error) {
      return done(error)
    }
  }

  passport.use(new LocalStrategy({usernameField: 'username'},
  authenticateUser))
  passport.serializeUser(User.serializeUser());
  // passport.serializeUser((user, done) => {
  //   console.log(`user: ${user} userid: ${user._id}`);
  //   return done(null, user.username);
  // });
    // done(null, user._id));
  // passport.deserializeUser((user, done) => {
  //   return done(null, User.findOne({_id: user._id}));
  // });
  passport.deserializeUser(User.deserializeUser());
}

// module.exports = initialize;

export default initialize;
