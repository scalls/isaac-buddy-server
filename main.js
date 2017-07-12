/*!
 * apiai
 * Copyright(c) 2015 http://api.ai/
 * Apache 2.0 Licensed
 */

'use strict';
var util = require('./util.js')

var https = require('https')
var apiai = require("apiai")
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

/* More test purpose stuff */
express.get('/dice_room/:num', (req, res) => {
  var num = req.params.num
  console.log('Attempting to retrieve data for dice room: ' + num)
  util.getDiceRoomInfo(num, (err, response) => {
    if (err) { util.sendError(err, res) }
    else { res.send(response) }
  })
})

/* Testing stuff */
express.get('/pills/:pill', (req, res) => {
  var pill = req.params.pill
  console.log('Attempting to retrieve data for pill: ' + pill)
  util.getPillInfo(pill, (err, response) => {
    if (err) { util.sendError(err, res) }
    else { res.send(response) }
  })
})

/* For testing */
express.get('/cardrune/:cardrune', (req, res) => {
  var cardrune = req.params.cardrune
  console.log('Attempting to retrieve data for card/rune: ' + cardrune)
  util.getCardRuneInfo(cardrune, (err, response) => {
    if (err) { util.sendError(err, res) }
    else { res.send(response) }
  })
})

/* Testing */
express.get('/sacrifice/:num', (req, res) => {
  var num = req.params.num
  console.log('Attempting to retrieve data for sacrifice room: ' + num)
  util.getSacrificeRoomInfo(num, (err, response) => {
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
        case 'card-rune-info':
          console.log(JSON.stringify(requestBody.result.parameters))
          console.log('Trying to get info on the card/rune: ' + requestBody.result.parameters.cardrune)
          util.getCardRuneInfo(requestBody.result.parameters.cardrune, (err, response) => {
            if (err) { util.sendErr(err, res) }
            else { res.send(response) }
          })
          break
        case 'dice-room-info':
          console.log(JSON.stringify(requestBody.result.parameters))
          console.log('Trying to get info on the dice room: ' + requestBody.result.parameters.number)
          util.getDiceRoomInfo(requestBody.result.parameters.number, (err, response) => {
            if (err) { util.sendError(err, res) }
            else { res.send(response) }
          })
          break
        case 'item-info':
          console.log('Trying to get info on the item: ' + requestBody.result.parameters.item)
          util.getItemInfo(requestBody.result.parameters.item, (err, response) => {
            if (err) { util.sendError(err, res) }
            else { res.send(response) }
          })
          break
        case 'pandora\'s-box-info':
          var floor = requestBody.result.parameters.floor
          var gamemode = requestBody.result.parameters.gamemode
          console.log('Trying to get info on pandora\'s box on floor + gamemode:' + floor + ' ' + gamemode)
          util.getPandorasBoxInfo(floor, gamemode, (err, response) => {
            if (err) { util.sendError(err, res) }
            else { res.send(response) }
          })
        case 'pill-info':
          console.log('Trying to get info on the pill: ' + requestBody.result.parameters.pill)
          util.getPillInfo(requestBody.result.parameters.pill, (err, response) => {
            if (err) { util.sendError(err, res) }
            else { res.send(response) }
          })
          break
        case 'sacrifice-room-info':
          console.log('Trying to get info on sacrifice room: ' + requestBody.result.parameters.num[0])
          util.getSacrificeRoomInfo(requestBody.result.parameters.num[0], (err, response) => {
            if (err) { util.send(err, res) }
            else { res.send(response) }
          })
          break
        case 'trinket-info':
          console.log('Trying to get info on the trinket: ' + requestBody.result.parameters.trinket)
          util.getTrinketInfo(requestBody.result.parameters.trinket, (err, response) => {
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
