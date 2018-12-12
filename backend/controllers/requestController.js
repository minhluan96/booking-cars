var express = require('express');
var requestService = require('../services/requestService');
var events = require('../events');
var broadcastAll = require('../webSocket').broadcastAll;
var moment = require('moment')

var router = express.Router();

router.post('/', (req, res, next) => {
  requestService.createRequest(req.body).then(value => {
    res.statusCode = 201
    var id = value.insertId
    req.body.ID = id
    var result = req.body
    res.json(result)

    console.log('sent')
    //events.publishRequestChange(result)
    broadcastAll(result)
  }).catch(err => {
    res.statusCode = 500;
    next(err);
  })
})

router.put('/:id/geocode', (req, res, next) => {
  requestService.updateGeocodeLocation(req.body).then(value => {
    res.statusCode = 201
    var result = req.body
    console.log(result)
    res.json(result)
    broadcastAll(result)
  }).catch(err => {
    res.statusCode = 500;
    next(err);
  })
})

router.put('/:id/status', (req, res, next) => {
  requestService.updateStatus(req.body).then(value => {
    var id = req.params.id
    return requestService.getRequestByID(id)
  }).then(rows => {
    res.statusCode = 201
    var result = rows[0]
    res.json(result)

    //events.publishRequestChange(result)
    broadcastAll(result)
  }).catch(err => {
    res.statusCode = 500;
    next(err);
  })
})

router.get('/refresh', (req, res, next) => {
  var staffID = req.query.staffID

  var ts = 0
  if (req.query.ts) {
    console.log(req.query.ts)
    ts = +req.query.ts
  }

  var loop = 0
  var execute = () => {
    requestService.getRequestsUpdate(staffID, ts).then(rows => {
      if (rows.length > 0) {
        console.log('refresh sent')
        res.json({
          results: rows,
          return_ts: moment().unix()
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

router.get('/', (req, res, next) => {
  var page = req.query.page || 1;
  var perPage = req.query.per_page || 10;
  var offset = (page - 1) * perPage;
  var staffID = req.query.staffID

  var totalItems = 0
  var totalPages = 0

  var ts = 0
  if (req.query.ts) {
    ts = +req.query.ts
  }

  var loop = 0
  var execute = () => {
    requestService.getTotalRequest(staffID).then(rows => {
      totalItems = rows[0].total
      totalPages = Math.ceil(totalItems / perPage)
      return requestService.getRequestsPerPage(staffID, perPage, offset)
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

router.get('/:id', (req, res, next) => {
  var id = req.params.id
  requestService.getRequestByID(id).then(value => {
    res.statusCode = 200
    if (value.length > 0) {
      res.json(value[0])
    } else {
      res.json({})
    }
  }).catch(err => {
    next(err)
  })
})

module.exports = router;
