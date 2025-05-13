const Redis = require('ioredis');
const logger = require('../src/helpers/logger');

// Connect to a remote Redis client
require('dotenv').config();

const client = new Redis({
    host: process.env.REDIS_HOST, // Host from .env
    port: process.env.REDIS_PORT, // Port from .env
    password: process.env.REDIS_PASSWORD, // Password from .env
});

// Handle Redis connection events
client.on('connect', () => {
    logger.info('[REDIS] client connected to remote server');
});

client.on('error', (err) => {
    logger.error(`[REDIS] client error: ${err.message}`);
});

module.exports = client;