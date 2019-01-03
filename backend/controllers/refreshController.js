var express = require('express');
var requestService = require('../services/requestService');
var events = require('../events');
var broadcastAll = require('../webSocket').broadcastAll;
var moment = require('moment')

var router = express.Router();

router.post('/', (req, res, next) => {
  var id = req.body.ID
  requestService.getRequestByID(id).then(value => {
    res.statusCode = 200
    if (value.length > 0) {
      res.json(value[0])
      broadcastAll(value)
    } else {
      res.json({})
    }
  })
})

module.exports = router;
