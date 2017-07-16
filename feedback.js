var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('db.sqlite')

exports.feedback = function(context, polarity, callback) {

  var intent = null
  var entity = null

  /* First, grab the parameters from the context */
  if (context.hasOwnProperty('cardrune')) {
    console.log('Logging cardrune info feedback...')
    intent = 'card-rune-info'
    entity = context.parameters.cardrune
  } else if (context.hasOwnProperty('dicenumber')) {
    console.log('Logging dice room info feedback...')
    intent = 'dice-room-info'
    entity = context.parameters.dicenumber
  } else if (context.hasOwnProperty('item')) {
    console.log('Logging item info feedback...')
    intent = 'item-info'
    entity = context.parameters.item
  } else if (context.hasOwnProperty('floor')) {
    console.log('Logging pandora\'s box info feedback...')
    intent = 'pandora\'s-box-info'
    entity = {
      'floor': context.parameters.floor,
      'gamemode': context.parameters.gamemode
    }
  } else if (context.hasOwnProperty('pill')) {
    console.log('Logging pill info feedback...')
    intent = 'pill-info'
    entity = context.parameters.pill
  } else if (context.hasOwnProperty('sacrificenum')) {
    console.log('Logging sacrifice room info feedback...')
    intent = 'sacrifice-room-info'
    entity = context.parameters.sacrificenum
  } else if (context.hasOwnProperty('trinket')) {
    console.log('Logging trinket room info feedback...')
    intent = 'trinket-info'
    entity = context.parameters.trinket
  }

  /* TODO: figure out SQLite3 and log the feedback */
  /*        using the polarity, intent, and entity */

  var res = {
    speech: 'Thank you for your input!',
    displayTest: 'Thank you for your input!',
  }

  callback(null, res)

}
