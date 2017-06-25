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
var bodyParser = require('body-parser')

const express = require('express')()
express.use(bodyParser.json())

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

/* Also for test purposes */
express.get('/trinket/:trinket', (req, res) => {
  var trinket = req.params.trinket
  console.log('Attempting to retrieve data for: ' + trinket)
  util.getTrinketInfo(trinket, (err, response) => {
    if (err) { util.sendError(err, res) }
    else { res.send(response) }
  })
})

express.post('/', (req, res) => {

  console.log('Received POST request')

  try {
    console.log('Trying stuff...')
    if (req.body) {
      var requestBody = req.body
      switch(requestBody.result.action) {
        case 'item-info':
          console.log('Trying to get info on the item: ' + requestBody.result.parameters.item)
          util.getItemInfo(requestBody.result.parameters.item, (err, response) => {
            if (err) { util.sendError(err, res) }
            else { res.send(response) }
          })
          break
        case 'trinket-info':
          console.log('Trying to get info on the trinket: ' + requestBody.result.parameters.trinket)
          util.getTrinketInfo(requestBody.result.parameters.trinket, (err, response) => {
            if (err) { util.sendError(err, res) }
            else { res.send(response) }
          })
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
