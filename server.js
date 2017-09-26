'use strict';

const express = require('express');
const app = express();
const path = require('path');
const cors = require('express-cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const knex = require('./knex');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

require('dotenv').config();
app.use(cors({
  allowedOrigins: ["localhost:*", "surge.sh", "herokuapp.com"]
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let success=(dbUser, res)=>{
  console.log('success');
  let authUser = {
    id: dbUser.id,
    username: dbUser.username,
    greeting: `${dbUser.username}... you're the best!!`,
    url: '/addwebsite'
  };
  let token = jwt.sign(authUser, process.env.JWT_KEY);
  res.cookie('token', token, {httpOnly: true, secure: true});
  console.log(`${dbUser.username} logged in @ ${new Date().toString()}`);
  return res.send(authUser);
};

let failure=(res)=>{
  console.log('failure');
  res.setHeader('content-type', 'text/plain');
  return res.status(400).send('Bad username or password');
}

app.get('/sites', (req,res,next)=>{
  knex('sites')
  .select('*')
  .then(data=>{
    res.send(data);
  })
})

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
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  res.clearCookie(token);
  res.setHeader('content-type', 'text/plain');
  console.log(`${decoded.username} logged out.`);
  return res.status(200).send(`${decoded.username} logged out.`);
})

app.post('/sites', (req,res,next)=>{
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, process.env.JWT_KEY, function (err,decoded) {
      if (err) {
        res.clearCookie('token');
        return res.redirect('http://creepypasta.wikia.com/wiki/Never_Become_a_Hacker');
      }
      let newSite = req.body;
      //add to knex here
      res.send()
    });
  } else {
    return res.redirect('http://creepypasta.wikia.com/wiki/Never_Become_a_Hacker');
  }
});

const port = process.env.PORT || 6969;
app.listen(port);

console.log(`Listening on ${port}`);
