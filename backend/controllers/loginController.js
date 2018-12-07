var express = require('express');
var jwt = require('jsonwebtoken');
var userService = require('../services/userService');

var router = express.Router();

router.post('/', (req, res, next) => {
  userService.login(req.body).then(rows => {
    if (rows.length > 0) {

        var userEntity = rows[0];
        var payload = {
          user: userEntity
        }

        var accessToken = jwt.sign(payload, 'SECRET-BOOKING-CARS-TOKEN', {
          expiresIn: '24h'
        });

        var refreshToken = userEntity.RefreshToken;
        res.json({
          auth: true,
          user: {
            id: userEntity.ID,
            username: userEntity.TenTaiKhoan
          },
          accessToken: accessToken,
          refreshToken: refreshToken
        })
      } else {
        res.json({
          auth: false
        })
      }
    }).catch(err => {
      res.statusCode = 500;
      next(err);
    })
})

module.exports = router;
