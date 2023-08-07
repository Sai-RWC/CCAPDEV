import { Strategy as LocalStrategy } from "passport-local";
// import { User } from "../models/user";
import bcrypt from 'bcrypt';


function initialize(passport, getUserByUserName)  {
  const authenticateUser = async (username, password, done) => {
    console.log(`username: ${username}`)
    console.log(`password: ${password}`)
    const user = await getUserByUserName(username)
    console.log(`${user.username}`);
    if (user == null) {
      console.log('User is found')
      return done(null, false, {message: "User is not found"});
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        console.log('Password is correct');
        return done(null, user)
      }
      else {
        return done(null, false, {message: "Incorrect password"})
      }

    } catch (error) {
      return done(error)
    }
  }

  passport.use(new LocalStrategy({usernameField: 'username'},
  authenticateUser))
  passport.serializeUser((user, done) => { })
  passport.deserializeUser((user, done) => { })
}

// module.exports = initialize;

export default initialize;
