import 'dotenv/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import exphbs from 'express-handlebars';
import session from 'express-session'
import passport from 'passport';


import { connect } from './src/models/db.js';
import 'bcrypt'
import { User } from './src/models/user.js';
import { Post } from './src/models/post.js';
import { Comment } from './src/models/comment.js';

import router from './src/routes/index.js';

async function main() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const app = express();

  app.use(session ({
    secret: "some secret here",
    cookie: {maxAge: 30000},
    saveUninitialized: true
  }));

  app.use('/static', express.static(__dirname + '/public'));

  app.engine('hbs', exphbs.engine({
    extname: 'hbs'
  }));

  app.set('view engine', 'hbs');

  app.set('views', './src/views');

  app.set('view cache', false);

  // app.get('/', (req, res) => {
  //   res.render('index', {
  //     title: 'Home',
  //   });
  // });
  //
  // app.get('/login', (req,res) => {
  //   res.render('login');
  // });
  //
  // app.get('/signup', (req,res) => {
  //   res.render('signup');
  // })

  app.use(express.json());

  app.use(router);

  app.listen(process.env.SERVER_PORT, () => {
    console.log("Express app is now listening");
    connect().then(() => {
      console.log("Now connected to MongoDB Server.");
    })
  });
}

main();
//
// app.get('/', (req,res) => {
//   res.redirect('/home');
// })
//
// app.get('/home', (req,res) => {
//   res.render('index', {
//     title: 'homepage',
//     name: 'test'
//   });
// });
//
// app.get('/login', (req,res) => {
//   res.render('login', {
//     title: 'Sign in'
//   });
// });
//
// app.get('/signup', (req,res) => {
//   res.render('signup', {
//     title: 'Sign up'
//   });
// });
//
// app.get('/user', (req,res) => {
//   res.render('user', {
//     title: 'Profile'
//   })
// })
//
// app.listen(port, () => {
//   console.log("Server now listening on port " + port);
// });
