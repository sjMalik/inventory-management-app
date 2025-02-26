const { db } = require('../../database/connection')  // Import the connection object

const User = {
    async findByEmail(email) {
        return db('users').where({ email }).first()
    }
}

module.exports = User;