// apm.js
const apm = require('elastic-apm-node').start({
  serviceName: 'cgc-app',              // Kibana에 표시될 서비스명
  serverUrl: 'http://192.168.219.107:8200',// APM Server 주소
  environment: 'production',               // 원하는 환경명
  captureBody: 'all',
  logLevel: 'info',
  centralConfig: false,
  active: process.env.NODE_ENV === 'production', // 필요 시 조건부 활성화
});

module.exports = apm;
