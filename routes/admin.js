// this route is <domain>/admin/

'use strict'

const express = require('express');
const router = express.Router();
const knex = require('../knex');


// router.use('*', (req,res,next)=>{
//   if (req.cookies.admin) {
//     jwt.verify(req.cookies.admin, process.env.JWT_KEY, function (err,decoded) {
//       if (err) {
//         res.clearCookie('admin');
//         return res.redirect('http://creepypasta.wikia.com/wiki/Never_Become_a_Hacker');
//       }
//       next();
//     });
//   } else {
//     return res.redirect('http://creepypasta.wikia.com/wiki/Never_Become_a_Hacker');
//   }
// })

router.get('/', (req,res,next)=>{
  res.send({data:'user'});
})

router.post('/sites', (req,res,next)=>{
  let newSite = req.body;
  //add to knex here
  res.send()
});
