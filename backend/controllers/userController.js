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
