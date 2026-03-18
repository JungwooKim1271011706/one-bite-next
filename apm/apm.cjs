const apm = require('elastic-apm-node').start({
  serviceName: 'cgc-app',
  serverUrl: 'http://192.168.219.107:8200',
  environment: 'production',
  captureBody: 'all',
  logLevel: 'info',
  active: process.env.NODE_ENV === 'production',
})

module.exports = apm
