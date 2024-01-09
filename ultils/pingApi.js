const cron = require('node-cron');
const https = require('https');

function pingServer(path) {
  const options = {
    hostname: 'api-csd-vietnam.onrender.com', // Địa chỉ domain của server
    path: path,
    method: 'GET',
  };

  const req = https.request(options, (res) => {
    console.log(`Ping ${path} successfully. Status: ${res.statusCode}`);
  });

  req.on('error', (error) => {
    console.error(`Ping failed ${path}:`, error);
  });

  req.end();
}

function startPingJob() {
  cron.schedule('*/10 * * * *', () => {
    pingServer('/api/v1/blog');
    pingServer('/api/v1/author');
    console.log('Pinged');
  });
}

module.exports = { startPingJob };
