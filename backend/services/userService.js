var md5 = require('crypto-js/md5');
var db = require('../repositories/mysql-provider');

exports.createAccount = function(userEntity) {
  var md5_pw = md5(userEntity.Password);
  var refreshToken = md5(Date.now());
  var sql = `insert into USERS(Username, Password, RefreshToken, ID_Roles) values('${userEntity.Username}', '${md5_pw}', '${refreshToken}', ${userEntity.Role})`
  return db.write(sql);
}

exports.login = function (userEntity) {
  var md5_pw = md5(userEntity.Password);
  var sql = `select * from USERS where Username = '${userEntity.Username}' and Password = '${md5_pw}' and ID_Roles = 2`;
  return db.load(sql);
}

exports.getUserInfo = function (id) {
  var sql = `select u.ID, u.Username, u.ID_Roles, r.Name from USERS u join ROLES r on u.ID_Roles = r.ID where u.id = ${id} and r.ID = 2`
  return db.load(sql)
}

exports.checkUserExists = function (userEntity) {
  var sql = `select * from USERS where Username = '${userEntity.Username}' and ID_Roles = 2`
  return db.load(sql)
}
