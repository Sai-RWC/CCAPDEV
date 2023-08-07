import { Strategy as LocalStrategy } from "passport-local";

function initialize(passport)  {
  passport.use(new LocalStrategy({usernameField: }))
}
