var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('db.sqlite')

exports.feedback = function(context, polarity, callback) {

  var res = {
    speech: 'Thank you for your input!',
    displayTest: 'Thank you for your input!',
  }

  callback(null, res)

}
