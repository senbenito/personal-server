// this route is <domain>/user/

'use strict'

const express = require('express');
const router = express.Router();
// const knex = require('../knex');


// router.use('*', (req,res,next)=>{
//   if (req.cookies.token) {
//     jwt.verify(req.cookies.token, process.env.JWT_KEY, function (err,decoded) {
//       if (err) {
//         res.clearCookie('token');
//         return res.redirect('http://creepypasta.wikia.com/wiki/Never_Become_a_Hacker');
//       }
//       next();
//     });
//   } else {
//     return res.redirect('http://creepypasta.wikia.com/wiki/Never_Become_a_Hacker');
//   }
// })

router.get('/', (req,res,next)=>{
  console.log('user route');
  res.send({data:'user'})
  // knex('sites')
  // .select('url', 'title')
  // .then(data=>{
  //   res.send(data[0]);
  // })
})

router.post('/sites', (req,res,next)=>{
  let newSite = req.body;
  //add to knex here
  res.send()
});
