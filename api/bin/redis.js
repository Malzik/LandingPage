const redis = require('redis');

const port = process.env.REDIS_PORT;
const host = process.env.REDIS_HOST;

const client = redis.createClient(port, host);

client.on('connect', function() {
    console.log(`Redis client connected on ${host}:${port}`);
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

exports.client = client;