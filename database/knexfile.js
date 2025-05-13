// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const dotenv = require('dotenv');
dotenv.config();

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'inventory-management',
      user: 'postgres',
      password: 'mysecretpassword'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: { rejectUnauthorized: false } // Enable SSL for production
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'my_db',
      user: process.env.DB_USER || 'username',
      password: process.env.DB_PASSWORD || 'password',
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false // Dynamically enable SSL
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
