const redis = require('ioredis');
const redisClient = new redis();
const logger = require('../src/helpers/logger');

redisClient.on('connect', () => {
    logger.info('[REDIS] client connected');
});

redisClient.on('error', (error) => {
    logger.error(`[REDIS] error: ${error}`);
});

module.exports = redisClient;
// The code snippet above shows the redis.js file, which is responsible for creating a Redis client instance and exporting it for use in other parts of the application. The Redis client instance is created using the ioredis library, and event listeners are added to handle connection and error events.