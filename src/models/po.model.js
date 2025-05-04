const { db } = require('../../database/connection');

class PO {

    // Create PO
    async create(data) {
        return await db('purchase_orders').insert(data).returning('*');
    }

    // Get PO by ID
    async getById(id) {
        return await db('purchase_orders').where({ id }).first();
    }

    // Get all POs
    async getAll() {
        // Get all purchase orders with their associated products and suppliers
        return await db('purchase_orders')
            .join('products', 'purchase_orders.product_id', 'products.id')
            .join('users', 'purchase_orders.supplier_id', 'users.id')
            .select(
            'purchase_orders.*',
            'products.name as product_name',
            db.raw("CONCAT(users.first_name, ' ', users.last_name) as supplier_full_name")
            );
    }

    // Update PO status
    // Status: 'PENDING_SUPPLIER_CONFIRMATION'::text, 'CONFIRMED_BY_SUPPLIER'::text, 'DELIVERED_BY_SUPPLIER'::text, 'GOODS_RECEIVED'::text
    async updateStatus(id, status) {
        return await db('purchase_orders')
            .where({ id })
            .update({ status, updated_at: db.fn.now() })
            .returning('*');
    }

    // Update PO
    async update(id, data) {
        return await db('purchase_orders')
            .where({ id })
            .update({ ...data, updated_at: db.fn.now() })
            .returning('*');
    }

    // Delete PO
    async delete(id) {
        return await db('purchase_orders')
            .where({ id })
            .del();
    }
}

module.exports = new PO();