const redis = require('ioredis');
const client = redis.createClient();
const logger = require('../src/helpers/logger');

// Handle Redis connection events
client.on('connect', () => {
    logger.info('[REDIS] client connected');
});

client.on('error', () => {
    logger.error('[REDIS] client error');
});

module.exports = client;