var db = require('../repositories/mysql-provider');
var moment = require('moment')

exports.createRequest = function (requestEntity) {
  var sql = `insert into REQUESTS(GuestName, GuestTelephone, NameLocation, Note, Status, created_at, FinishLocationName)
            values (N'${requestEntity.GuestName}', '${requestEntity.GuestTelephone}', N'${requestEntity.NameLocation}',
            N'${requestEntity.Note}', ${requestEntity.Status}, ${moment().unix()}, N'${requestEntity.FinishLocationName}')`
  console.log(sql)
  return db.write(sql)
}

exports.getTotalRequest = function (id) {
  var waitingStatusCode = 3
  var processingStatusCode = 5
  var sql = `select count(*) as total from REQUESTS where (Status = ${waitingStatusCode} or Status = ${processingStatusCode}) and (HandlingStaff = ${id} or HandlingStaff is NULL)`
  return db.load(sql)
}

exports.getRequestsPerPage = function (id, limit, offset) {
  var waitingStatusCode = 3
  var processingStatusCode = 5
  var dontHaveCar = 9
  var sql = `select req.*, sts.Name as StatusName from REQUESTS req join STATUS sts on req.Status = sts.ID
            where (sts.ID = ${waitingStatusCode} or sts.ID = ${processingStatusCode} or sts.ID = ${dontHaveCar}) 
            and (req.HandlingStaff = ${id} or req.HandlingStaff is NULL)
            order by sts.ID desc limit ${limit} offset ${offset}`
  console.log(sql)
  return db.load(sql)
}

exports.getRequestsUpdate = function (id, ts) {
  var waitingStatusCode = 3
  var processingStatusCode = 5
  var dontHaveCar = 9
  var sql = `select req.*, sts.Name as StatusName from REQUESTS req join STATUS sts on req.Status = sts.ID
            where (sts.ID = ${waitingStatusCode} or sts.ID = ${processingStatusCode} or sts.ID = ${dontHaveCar})
            and (req.HandlingStaff = ${id} or req.HandlingStaff is NULL) and req.created_at >= ${ts}`
  console.log(sql)
  return db.load(sql)
}

exports.updateGeocodeLocation = function (requestEntity) {
  var processedStatusCode = 6
  var sql = `update REQUESTS set Latitude = '${requestEntity.start.Lat}', Longtitude = '${requestEntity.start.Lng}',
            FinishLatitude = '${requestEntity.end.Lat}', FinishLongtitude = '${requestEntity.end.Lng}',
            Status = ${processedStatusCode}, created_at = ${moment().unix()} where ID = ${requestEntity.ID}`
  console.log(sql)
  return db.write(sql)
}

exports.updateStatus = function (requestEntity) {
  var statusCode = requestEntity.Status
  var sql = `update REQUESTS set Status = ${statusCode},
            HandlingStaff = ${requestEntity.StaffID}, created_at = ${moment().unix()} where ID = ${requestEntity.ID}`
  return db.write(sql)
}

exports.getRequestByID = function (id) {
  var sql = `select req.*, sts.Name as StatusName from REQUESTS req join STATUS sts on req.Status = sts.ID
            where req.ID = ${id}`
  return db.load(sql)
}
