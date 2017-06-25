/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';
var util = require('./util.js')

var https = require('https')
var apiai = require("apiai")
var key = apiai("2657996f7a2541ec827362de2c09cf8d")

const express = require('express')()

express.listen(process.env.PORT || 3000, function() {
  console.log('Isaac Buddy listening!')
})

/* For test purposes */
express.get('/item/:item', (req, res) => {
  var item = req.params.item
  console.log('Attempting to retrieve data for: ' + item)
  util.getItemInfo(item, (err, response) => {
    if (err) { util.sendError(err, res) }
    else { res.send(response) }
  })
})

express.post('/', (req, res) => {

  console.log('Received POST request')

  try {
    console.log('Trying stuff...')
    console.log('Received request: ' + JSON.stringify(req))
    if (req.body) {
      var requestBody = req.body
      console.log('Request body: ' + JSON.stringify(requestBody))
      switch(requestBody.result.action) {
        case 'item-info':
          console.log('Trying to get info on the item: ' + requestBody.result.parameters.item)
          util.getItemInfo(requestBody.result.parameters.item, (err, response) => {
            if (err) { util.sendError(err, res) }
            else { res.send(response) }
          })
          break
        default:
          return res.send({})
      }
    } else {
      console.log('No body found in the request')
    }

  } catch(err) {
    console.log('Something went wrong...sending an error')
    /* Send an error message back if this didn't work */
    util.sendError(err, res)
  }
  console.log('After the try/catch block')
})
