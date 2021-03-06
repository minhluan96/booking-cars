var eventEmitter = require('eventemitter3');

var emitter = new eventEmitter();

var subscribeEvent = (req, res, event) => {
  res.writeHead(200, {
    'ContentType': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  });

  var heartBeat = setInterval(() => {
    res.write('\n')
  }, 15000);

  var handler = data => {
    var json = JSON.stringify(data)
    res.write(`retry: 500\n`)
    res.write(`event: ${event}\n`)
    res.write(`data: ${json}\n`)
    res.write(`\n`)
  }

  emitter.on(event, handler)

  req.on('close', () => {
    clearInterval(heartBeat)
    emitter.removeListener(event, handler);
  })
}

var subcribeRequestChange = (req, res) => {
  subscribeEvent(req, res, 'REQUEST_CHANGE')
}

var publishRequestChange = requestObj => {
  emitter.emit('REQUEST_CHANGE', requestObj)
}

module.exports = {
  subcribeRequestChange,
  publishRequestChange
}
