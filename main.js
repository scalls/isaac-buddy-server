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
const bodyParser = require('body-parser')

express.use(bodyParser.json())

express.post('/', function(req, res) {

  console.log('Received POST request')

  try {

    if (req.body) {

      var requestBody = req.body
      if (requestBody.result.action) {
        console.log('Received action: ' + requestBody.result.action)
      }

    }

    res.send({
      'speech': 'Derp.',
      'source': 'Statman',
      'displayText': 'Derp.'
    })

  } catch(err) {

    console.error('Cannot process request', err)
    res.status(400).json({
      status: {
        code: 400,
        errorType: err.message
      }
    })
  }
})

express.listen(process.env.PORT || 3000, function() {
  console.log('Statman listening!')
})
