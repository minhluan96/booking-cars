var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    cors = require('cors');

var app = express();

var userController = require('./controllers/userController');
var signupController = require('./controllers/signupController');
var requestController = require('./controllers/requestController');
var loginController = require('./controllers/loginController');

app.use(morgan('dev'));
app.use(bodyParser('json'));
app.use(cors())

app.get ('/', (req, res) => {
  res.json({
    msg: 'Backend Booking Cars'
  });
})

var verifyAccessToken = (req, res, next) => {
  var token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'SECRET-BOOKING-CARS-TOKEN', (err, payload) => {
      if (err) {
        res.statusCode = 403;
        res.json({
          msg: 'INVALID TOKEN',
          error: err
        });
      } else {
        req.token_payload = payload;
        next();
      }
    })
  } else {
    res.statusCode = 403;
    res.json({
      msg: `TOKEN DOESN'T EXIST`
    });
  }
}

app.use('/signup', signupController);
app.use('/login', loginController);
app.use('/users', verifyAccessToken, userController);
app.use('/requests', verifyAccessToken, requestController);

app.use((req, res, next) => {
  var err = new Error("Not found");
  err.status = 404;
  next(err);
})

app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500);
  res.json({
    'error': err.message
  });
})

var port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})
