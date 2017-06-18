/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';
var http = require('http')
var apiai = require("apiai")
var key = apiai("2657996f7a2541ec827362de2c09cf8d")
var curl = require('curl')
var htmlParser = require('htmlparser2')

const express = require('express')()
const bodyParser = require('body-parser')

express.use(bodyParser.json())

express.post('/', function(req, res) {

  console.log('Received POST request')

  try {

    if (req.body) {

      var requestBody = req.body
      if (requestBody.result.action == 'career-stat-retrieval') {
        return res.send(getCareerStat(requestBody.result.parameters))
      }

    }

    return res.send({})

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

function getCareerStat(parameters) {

  var stat = parameters['baseball-stat']
  var firstName = parameters['given-name'].toLowerCase()
  var lastName = parameters['last-name'].toLowerCase()

  console.log('Processing request: ' + stat + ' ' + firstName + ' ' + lastName)

  /* Get the correct number for the end of the Baseball Reference URL */
  var urlNum = getCorrectNumber(firstName, lastName)

  var url = 'www.baseball-reference.com/players/' + lastName[0]
  url += '/' + lastName.substring(0, 5) + firstName.substring(0, 2)

  var possibilities = []

  /* Use that number to pull up the correct player's page */
  if (urlMum < 10) {
    url += '0'
  }
  url += urlNum + '.shtml'

  /* Scrape the page for the requested statistic */
  var statNum = scrape(url, stat)

  /* Return the data */
  /* TODO: format the response */
  return {}
}

function getCorrectNumber(firstName, lastName) {

  var url = 'www.baseball-reference.com/players/' + lastName[0]
  url += '/' + lastName.substring(0, 5) + firstName.substring(0, 2)
  var num = 1

  /* Start from 1 and increment, checking each page for the requested player */
  /*  NOTE: Not sure how to handle indentical names yet. Might need to prompt
              the user, asking which 'John Smith' they want to know about. */
  while (num < 10) {

    var testUrl = url
    if (num < 10) {
      testUrl += 0
    }
    testUrl += num + '.shtml'

    curl.get(testUrl, null, function(err, response, body) {

      console.log('Got their page!: ' + body)

    })

    num += 1

  }

  num = 1 /* NOTE: Should be removed later */

  return num
}

function scrape(url, stat) {
  /* TODO: fill this in */
}
