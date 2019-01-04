var express = require('express');
var jwt = require('jsonwebtoken');
var userService = require('../services/userService');

var router = express.Router();

router.post('/', (req, res, next) => {
  userService.createAccount(req.body).then(value => {
    res.statusCode = 201
    var result = { 'id': value.insertId, 'username': req.body.Username }
    res.json(result)
  }).catch(err => {
    res.statusCode = 500;
    next(err);
  })
})

var toRad = function (x) {
  return x * Math.PI / 180;
}

var harversine = function(latitude, longtitude, driverLatitude, driverLongtitude) {
  var R = 6371; // km
  var x1 = latitude - driverLatitude
  var dLat = toRad(x1)
  var x2 = longtitude - driverLongtitude
  var dLng = toRad(x2)
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(driverLatitude)) * Math.cos(toRad(latitude)) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d
}

router.get('/drivers', (req, res, next) => {
  var nearestDrivers = req.query.quantity
  var latitude = req.query.latitude
  var longtitude = req.query.longtitude

  userService.getAllDrivers().then(rows => {
    if (rows.length > 0) {
      var distance = harversine(latitude, longtitude, rows[0].Latitude, rows[0].Longtitude)
      var count = 0
      var nearest = []
      for (var r of rows) {
        if (count >= nearestDrivers) {
          break
        }
        nearest.push(r)
        count++
      }
      res.json(nearest)
    } else {
      res.json({})
    }
  }).catch(err => {
    res.statusCode = 500
    next(err)
  })
})

router.get('/:id', (req, res, next) => {
  userService.getUserInfo(req.params.id).then(value => {
    res.statusCode = 200
    res.json(value[0])
  }).catch(err => {
    res.statusCode = 500
    next(err)
  })
})

module.exports = router;
