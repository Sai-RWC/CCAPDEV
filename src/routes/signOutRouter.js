import { Router } from "express";

const signOutRouter = Router();

signOutRouter.get('/signout', (req, res) => {
  process.env.ISLOGGEDIN = "";
  process.env.CURRENTUSERID = "";
  res.redirect('/');
});

export default signOutRouter;
