const express = require('express');
const request = require('request-promise-native');
const uuid = require('uuid/v4');
const validator = require('validator');

var config = require('../config');
var {redis, mailer, consts} = require('../index');
var router = express.Router();

var _ = require("underscore")
var fs = require('fs');
var bureaux_content = JSON.parse(fs.readFileSync('./public/bureaux_etranger.json'));

router.get('/polls/search', (req, res) => {
  var results = _.filter(bureaux_content, function(obj){
    return ~obj.consulat.toLowerCase().indexOf(decodeURIComponent(req.query.q));
  });
  res.json(results)
});

module.exports = router;
