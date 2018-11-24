var express = require('express');
var requestService = require('../services/requestService');

var router = express.Router();

router.post('/', (req, res, next) => {
  requestService.createRequest(req.body).then(value => {
    res.statusCode = 201
    res.json(req.body)
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

  requestService.getTotalRequest().then(rows => {
    totalItems = rows[0].total
    totalPages = Math.ceil(totalItems / perPage)
    return bookService.getRequestsPerPage(perPage, offset)
  }).then(rows => {
    res.json({
      results: rows,
      perPage: rows.length,
      totalPages: totalPages
    })
  }).catch(error => {
    next(error);
  })
})

module.exports = router;
