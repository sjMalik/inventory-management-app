const {db} = require('../../database/connection');

class Product {
    async findAll({page, limit, status, search}) {
        const query = db('products')

        // If the status parameter is provided, filter by status
        if (status) {
            query.where({ status: status.toUpperCase() })
        }

        // If the search parameter is provided, search by name or description
        if (search) {
            query.where('name', 'ilike', `%${search}%`).orWhere('description', 'ilike', `%${search}%`)
        }

        // If the page and limit parameters are provided, paginate the results
        if (page && limit) {
            query.limit(limit).offset((page - 1) * limit)
        }

        // get total count of products
        const totalCount = await query.clone().count()
        const total = parseInt(totalCount[0].count)
        const totalPages = Math.ceil(total / limit)

        // get the products
        const products = await query.select('*')
        
        return { page, totalPages, total, products }
    }

    // Fetch a single product by ID
    async findById(id) {
        return db('products').where({ id }).first()
    }

    async create(product) {
        return db('products').insert(product).returning('*')
    }

    async update(id, product) {
        return db('products').where({ id }).update(product).returning('*')
    }

    async delete(id) {
        return db('products').where({ id }).del()
    }
}

module.exports = new Product();