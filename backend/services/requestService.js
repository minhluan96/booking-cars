var db = require('../repositories/mysql-provider');

exports.createRequest = function (requestEntity) {
  var sql = `insert into REQUESTS(GuestName, GuestTelephone, NameLocation, Note, Status)
            values (N'${requestEntity.GuestName}', '${requestEntity.GuestTelephone}', N'${requestEntity.NameLocation}',
            N'${requestEntity.Note}', ${requestEntity.Status})`
  console.log(sql)
  return db.write(sql)
}

exports.getTotalRequest = function () {
  var waitingStatusCode = 3
  var sql = `select count(*) as total from REQUESTS where Status = ${waitingStatusCode}`
  return db.load(sql)
}

exports.getRequestsPerPage = function (limit, offset) {
  var sql = `select req.*, sts.Name as StatusName from REQUESTS req join STATUS sts on req.Status = sts.ID limit ${limit} offset ${offset}`
  console.log(sql)
  return db.load(sql)
}
