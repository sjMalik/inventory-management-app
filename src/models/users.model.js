const {db} = require('../../database/connection');

const User = {
  async createUser(userData) {
    const [user] = await db('users').insert(userData).returning('*');
    return user;
  },

  async findByEmail(email) {
    return db('users').where({ email }).first();
  },
};

module.exports = User;
