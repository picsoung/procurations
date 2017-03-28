const express = require('express');
const request = require('request-promise-native');
const uuid = require('uuid/v4');
const validator = require('validator');

var config = require('../config');
var {redis, mailer, consts} = require('../index');
var router = express.Router();
var wrap = fn => (...args) => fn(...args).catch(args[2]);

router.get('/step2-liste-consulaire', wrap(async (req,res) => {
  var errors = req.session.errors;
  delete req.session.errors;

  var commune = (await redis.getAsync(`requests:${req.session.email}:commune`));

  res.render('step2-liste-consulaire', {email: req.session.email, commune, errors});
}));

router.post('/step2-liste-consulaire', wrap(async (req,res) => {
  if (!req.body.commune)  { // one should be filled
    req.session.errors = {};
    req.session.errors['commune'] = 'Ce champ ne peut être vide.';

    return res.redirect('/step2-liste-consulaire');
  }

  res.redirect('/etape-2/confirmation');
}));

module.exports = router;
