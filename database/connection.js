const knex = require('knex');
const knexConfig = require('./knexfile');
const EventEmitter = require('events');
const logger = require('../src/helpers/logger');

// Event Emitter for database events
class DatabaseEmitter extends EventEmitter {}
const dbEmitter = new DatabaseEmitter();

// Get the environment (default to 'development')
const environment = process.env.NODE_ENV || 'development';

// Initialize Knex with the selected environment configuration
const db = knex(knexConfig[environment]);

// Handle database disconnection events
db.client.pool.on('destroy', () => {
  logger.warn('[DATABASE] Connection to PostgreSQL closed');
  dbEmitter.emit('disconnected'); // Emit event on disconnection
});

// Export the database instance and event emitter
module.exports = { db, dbEmitter };
