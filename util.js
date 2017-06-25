var curl = require('curl')
var cheerio = require('cheerio')
var http = require('http')

exports.getItemInfo = function(item, callback) {

  item = item.toLowerCase()

  var url = 'http://bindingofisaacrebirth.gamepedia.com/item'
  curl.get(url, null, (err, res, body) => {
    const $ = cheerio.load(body)
    /* First, get the list of all of the items */
    var actives = $('tr', 'table[data-description="Activated Collectibles"]').toArray()
    var passives = $('tr', 'table[data-description="Passive Collectibles"]').toArray()

    /* Second search through each list to find the specified item */
    var index = -1
    var isActive = false
    var isPassive = false

    /* Loop through the active items */
    for (var i = 1; i < actives.length; i++) {
      var temp_name = $(actives[i]).text().split('\n')[1].toLowerCase().trim()
      if (item == temp_name) {
        console.log('Found active item: ' + temp_name)
        isActive = true
        index = i
        item = $(actives[index]).text().split('\n')
        break
      }
    }

    /* Loop through the passive items, if necessary */
    if (!isActive) {
      for (var i = 1; i < passives.length; i++) {
        var temp_name = $(passives[i]).text().split('\n')[1].toLowerCase().trim()

        console.log(JSON.stringify(item.split(' ')))

        if (item == temp_name) {
          console.log('Found passive item: ' + temp_name)
          isPassive = true
          index = i
          item = $(passives[index]).text().split('\n')
          break
        }
      }
    }

    /* Return an error if the item is not found */
    if (index == -1) {
      callback('item (' + item + ') not found', null)
      return
    }

    /* Prepare the JSON for return */
    var res = {
      speech: item[9].trim(),
      displayText: item[9].trim(),
      source: 'bindingofisaacrebirth.gamepedia.com/',
    }
    callback(null, res)
    return

    /* NOTE: after .text().split('\n') on a table item:
              -- Name = [1]
              -- ID = [3]
              -- Icon = [5]
              -- Quote = [7]
              -- Description = [9]
              -- Recharge = [11] (active items only) */
  })

}

exports.sendError = function(err, res) {
  console.error('Cannot process request', err)
  res.status(400).json({
    status: {
      code: 400,
      errorType: err.message
    }
  })
}
