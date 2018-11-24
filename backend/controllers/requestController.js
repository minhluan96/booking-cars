var express = require('express');
var requestService = require('../services/requestService');
var events = require('../events');
var broadcastAll = require('../webSocket').broadcastAll;
var moment = require('moment')

var router = express.Router();

router.post('/', (req, res, next) => {
  requestService.createRequest(req.body).then(value => {
    res.statusCode = 201
    var result = req.body
    res.json(result)

    events.publishRequestChange(result)
    broadcastAll(result)
  }).catch(err => {
    res.statusCode = 500;
    next(err);
  })
})

router.get('/', (req, res, next) => {
  var page = req.query.page || 1;
  var perPage = req.query.per_page || 10;
  var offset = (page - 1) * perPage;

  var totalItems = 0
  var totalPages = 0

  var ts = 0
  if (req.query.ts) {
    ts = +req.query.ts
  }

  var loop = 0
  var execute = () => {
    requestService.getTotalRequest().then(rows => {
      totalItems = rows[0].total
      totalPages = Math.ceil(totalItems / perPage)
      return requestService.getRequestsPerPage(perPage, offset)
    }).then(rows => {
      if (rows.length > 0) {
        res.json({
          results: rows,
          perPage: rows.length,
          return_ts: moment().unix(),
          totalPages: totalPages
        })
      } else {
        loop++
        if (loop < 5) {
          setTimeout(execute, 3500)
        } else {
          res.statusCode = 204
          res.end('No updated data')
        }
      }

    }).catch(error => {
      next(error);
    })
  }
  execute()

})

module.exports = router;
