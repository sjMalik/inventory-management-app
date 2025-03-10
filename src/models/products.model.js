const { db } = require('../../database/connection');

class Product {
    async getAll({ status, search, page = 1, limit = 10, sort_by, order }) {
        let query = db('products');

        if (status) {
            query = query.where('status', status.toUpperCase());
        }

        if (search) {
            query = query.where('name', 'ilike', `%${search}%`).orWhere('description', 'ilike', `%${search}%`);
        }

        // Apply sorting
        const validSortColumns = ['name', 'price', 'stock_quantity', 'created_at', 'updated_at'];
        const validOrderTypes = ['asc', 'desc'];

        if (sort_by && validSortColumns.includes(sort_by)) {
            const orderDirection = validOrderTypes.includes(order) ? order : 'asc';
            query = query.orderBy(sort_by, orderDirection);
        }

        const offset = (page - 1) * limit;
        query = query.offset(offset).limit(limit);

        const total = await db('products').count();
        const totalPages = Math.ceil(parseInt(total[0].count) / limit);

        const products = await query.select('*');

        return { products, totalPages, currentPage: page, totalItems: parseInt(total[0].count) };

    }

    async create(data) {
        return await db('products').insert(data).returning('*');
    }

    async update(id, data) {
        return await db('products')
            .where({ id, status: 'ACTIVE' })
            .update({ ...data, updated_at: db.fn.now() }).returning('*');
    }

    async getById(id) {
        return await db('products').where({ id }).first();
    }

    async delete(id) {
        return await db('products').where({ id }).del();
    }
}

module.exports = new Product();