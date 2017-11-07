'use strict';

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const knex = require('./knex');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

require('dotenv').config();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/sites', (req,res,next)=>{
  knex('sites')
  .select('*')
  .then(data=>{
    let fifthOrbit = [];
    let fourthOrbit = [];
    let thirdOrbit = [];
    let secondOrbit = [];
    data.reverse();
    data.unshift({
      id: 0,
      url: "",
      title: "",
      description: "",
      userid: "",
      password: ""
    });

    data.forEach( e => {
      (e.userid !== "") ?
        e.toast = `PSSSSSSSST.......... username = '${e.userid}'        password = '${e.password}'`
      :
        e.toast = ""
      });

    for (let i=0; i<data.length; i++){
      if (i<4) {fifthOrbit.push(data[i]);
      } else if (i<6) {
        fourthOrbit.push(data[i]);
      } else if (i<9) {thirdOrbit.push(data[i]);
      } else {secondOrbit.push(data[i]);}
    };

    let websites = [fifthOrbit, fourthOrbit, thirdOrbit, secondOrbit];
    res.send(websites);
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

let success=(dbUser, res)=>{
  console.log('success');
  let authUser = {
    id: dbUser.id,
    username: dbUser.username,
    greeting: `${dbUser.username}... you're the best!!`,
    url: '/addwebsite'
  };
  jwt.sign(authUser, process.env.JWT_KEY, (err, token)=>{
    res.cookie('token', token, {httpOnly: true, secure: true});
    console.log(`${dbUser.username} logged in @ ${new Date().toString()}`);
    return res.send(authUser);
  });
};

let failure=(res)=>{
  console.log('failure');
  res.setHeader('content-type', 'text/plain');
  return res.status(400).send('Bad username or password');
}

app.get('/logout', (req,res,send)=>{
  let token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  res.clearCookie(token);
  res.setHeader('content-type', 'text/plain');
  console.log(`${decoded.username} logged out.`);
  return res.status(200).send(`${decoded.username} logged out.`);
})

app.post('/sites', (req,res,next)=>{
  console.log(req.cookies);
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, process.env.JWT_KEY, function (err,decoded) {
      if (err) {
        console.log("somebody else is here...");
        res.clearCookie('token');
        return res.status(401).send();
      }
      let newsite = {
        url: req.body.url,
        title: req.body.title
      };
      knex('sites')
      .insert(newsite)
      .then(data => {
      let addedSite = {
        url: '/',
        title: data.title,
      }
      res.send(addedSite);
      });
    });
  } else {
    console.log('no token = GTFO');
    return res.status(401).send();
  }
});

const port = process.env.PORT || 6969;
app.listen(port);

console.log(`Listening on ${port}`);
