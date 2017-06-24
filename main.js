/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';
var util = require('./util.js')

var http = require('http')
var apiai = require("apiai")
var key = apiai("2657996f7a2541ec827362de2c09cf8d")
var curl = require('curl')
var fs = require('fs')
var cheerio = require('cheerio')

const express = require('express')()

express.listen(process.env.PORT || 3000, function() {
  console.log('Statman listening!')
})

express.post('/', function(req, res) {

  console.log('Received POST request')

  try {

    if (req.body) {
      var requestBody = req.body
      switch(requestBody.result.action) {
        case 'item-info':
          util.getItemInfo(requestBody.result.parameters, (err, res) => {
            if (err) { util.sendError(err) }
            else { res.send(res) }
          })
          break
        default:
          return res.send({})
      }
    }

  } catch(err) {
    /* Send an error message back if this didn't work */
    util.sendError(err)
  }
})
