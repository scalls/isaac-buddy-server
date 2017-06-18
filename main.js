/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';
var http = require('http');
var apiai = require("apiai");
var key = apiai("2657996f7a2541ec827362de2c09cf8d");

const express = require('express')()

express.get('/', function(req, res) {
  res.send('Hello World!')
})

express.post('/', function(req, res) {
  console.log('req: ' + JSON.stringify(req))
  console.log('req.params: ' + JSON.stringify(req.params))
  console.log('req.query: ' + JSON.stringify(req.query))
  res.send({
    'speech': 'Derp.',
    'source': 'Statman',
    'displayText': 'Derp.'
  })
})

express.listen(process.env.PORT || 3000, function() {
  console.log('Statman listening!')
})
