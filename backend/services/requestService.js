var db = require('../repositories/mysql-provider');

exports.createRequest = function (requestEntity) {
  var sql = `insert into REQUESTS(GuestName, GuestTelephone, NameLocation, Note, Status)
            values (N'${requestEntity.GuestName}', '${requestEntity.GuestTelephone}', N'${requestEntity.NameLocation}',
            N'${requestEntity.Note}', ${requestEntity.Status})`
  console.log(sql)
  return db.write(sql)
}

exports.getTotalRequest = function (id) {
  var waitingStatusCode = 3
  var sql = `select count(*) as total from REQUESTS where Status = ${waitingStatusCode} or HandlingStaff = ${id} or HandlingStaff is NULL`
  return db.load(sql)
}

exports.getRequestsPerPage = function (id, limit, offset) {
  var waitingStatusCode = 3
  var sql = `select req.*, sts.Name as StatusName from REQUESTS req join STATUS sts on req.Status = sts.ID
            where sts.ID = ${waitingStatusCode} or req.HandlingStaff = ${id} or req.HandlingStaff is NULL limit ${limit} offset ${offset}`
  console.log(sql)
  return db.load(sql)
}

exports.updateGeocodeLocation = function (requestEntity) {
  var processedStatusCode = 6
  var sql = `update REQUESTS set Latitude = '${requestEntity.Latitude}', Longtitude = '${requestEntity.Longtitude}',
              Status = ${processedStatusCode} where ID = ${requestEntity.ID}`
  console.log(sql)
  return db.write(sql)
}

exports.updateStatus = function (requestEntity) {
  var statusCode = requestEntity.Status
  var sql = `update REQUESTS set Status = ${statusCode}, HandlingStaff = ${requestEntity.StaffID} where ID = ${requestEntity.ID}`
  return db.write(sql)
}

exports.getRequestByID = function (id) {
  var sql = `select req.*, sts.Name as StatusName from REQUESTS req join STATUS sts on req.Status = sts.ID
            where req.ID = ${id}`
  return db.load(sql)
}
