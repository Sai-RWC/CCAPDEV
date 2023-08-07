import 'dotenv/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import exphbs from 'express-handlebars';
import handlebars from 'express-handlebars';
import session from 'express-session'

import passport from 'passport';
import flash from 'express-flash';


import { connect } from './src/models/db.js';
import 'bcrypt'
import { User } from './src/models/user.js';
import { Post } from './src/models/post.js';
import { Comment } from './src/models/comment.js';

import router from './src/routes/index.js';

import { formatDate } from './src/helpers/handlebars-helpers.js';
import { loginError } from './src/helpers/handlebars-helpers.js';

import initialize from './src/config/passport-config.js';

async function main() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const app = express();

  app.use('/static', express.static(__dirname + '/public'));

  app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    helpers: {
      formatDate,
      loginError
    }
  }));

  app.set('view engine', 'hbs');

  app.set('views', './src/views');

  app.set('view cache', false);

  initialize(
    passport 
    // user => User.findOne({username: user}),
    // id => User.findOne({_id: id})
  );

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

  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(flash());

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
