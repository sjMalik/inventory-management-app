const {db} = require('../../database/connection');

class Product {
    async getAll() {
        return await db('products').select('*');
    }
    
    async create(data) {
        return await db('products').insert(data).returning('*');
    }
}

module.exports = new Product();