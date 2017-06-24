exports.getItemInfo = function(params, callback) {

}

exports.sendError = function(err) {
  console.error('Cannot process request', err)
  res.status(400).json({
    status: {
      code: 400,
      errorType: err.message
    }
  })
}
