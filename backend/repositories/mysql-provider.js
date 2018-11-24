var mysql = require('mysql');

exports.load = function(sql) {
  return new Promise((resolve, reject) => {
    var connection = mysql.createConnection({
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'booking_cars'
    });
    connection.connect();

    connection.query(sql, (error, results, fields) => {
      if (error)
        reject(error);
      else
        resolve(results);

      connection.end();
    });
  });
}

exports.write = function(sql) {
  return new Promise((resolve, reject) => {
    var connection = mysql.createConnection({
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'booking_cars'
    });
    connection.connect();

    connection.query(sql, (error, value) => {
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
      connection.end();
    })
  })

}
