import { Router } from "express";

const signOutRouter = Router();

signOutRouter.get('/signout', checkAuthenticated, (req, res) => {
  req.logout();
  res.redirect('/');
});

signOutRouter.get('/signout', (req, res) => {
  res.redirect(302, '/');
})

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

export default signOutRouter;
