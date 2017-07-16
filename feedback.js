var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('db.sqlite')

exports.feedback = function(context, polarity, callback) {

  var res = {
    speech: 'Thank you for your input!',
    displayTest: 'Thank you for your input!',
  }

  switch () {
    case context.hasOwnProperty('item'):
      console.log('Logging item intent feedback...')
      break
  }

  callback(null, res)

}
