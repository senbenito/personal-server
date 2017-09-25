'use strict';

const express = require('express');
const app = express();
const admin = require('./routes/admin');
const user = require('./routes/user');
const path = require('path');
const cors = require('express-cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const knex = require('./knex');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

let success=(dbUser, res)=>{
  let authUser = {
    id: dbUser.id,
    username: dbUser.username,
    greeting: `${dbUser.username}... you're the best!!`
  };
  let token = jwt.sign(authUser, process.env.JWT_KEY);
  dbUser.admin ? res.cookie('admin', token, {httpOnly: true, secure: true}) : res.cookie('token', token, {httpOnly: true, secure: true});
  console.log(`${dbUser.username} logged in @ ${new Date().toString()}`);
  // return res.send(authUser);
  return res.redirect('/');
};

let failure=(res)=>{
  console.log('failure');
  res.setHeader('content-type', 'text/plain');
  return res.status(400).send('Bad username or password');
}


require('dotenv').config();
app.use(cors({
  allowedOrigins: ["localhost:*", "surge.sh", "herokuapp.com"]
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', (req,res,next)=>{
  req.cookies.admin ? console.log('admin') : console.log('user');
})

app.get('/sites', (req,res,next)=>{
  knex('sites')
  .select('url', 'title')
  .then(data=>{
    res.send(data[0]);
  })
})

// app.use('/admin', admin);
app.use('/', user);


app.post('/login', (req,res,next) => {
  let username = req.body.username;
  let password = req.body.password;
  knex('users')
  .select('*')
  .where('username', username)
  .then(data => {
    if(data.length === 0) return failure(res);
    bcrypt.compare(password, data[0].hashed_password)
    .then((userOK)=>{
      userOK ? success(data[0], res) : failure(res);
    })
  });
});

app.get('/logout', (req,res,send)=>{
  let token = req.cookies.token;
  res.clearCookie(token);
  console.log(`${decoded.username} logged out.`);
  res.setHeader('content-type', 'text/plain');
  return res.status(200).send(`${decoded.username} logged out.`);
});


const port = process.env.PORT || 6969;
app.listen(port);

console.log(`Listening on ${port}`);
