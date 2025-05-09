const { db } = require('../../database/connection');

class SO {
    // Create SO and line items payload will contain single so and multiple line items
    async create(data) {
        const { line_items, ...soData } = data;
        const trx = await db.transaction();
        try {
            const so = await trx('sales_orders').insert(soData).returning('*');
            const soId = so[0].id;
            const lineItems = line_items.map(item => ({ ...item, sale_id: soId }));
            await trx('sales_items').insert(lineItems);
            await trx.commit();
            return so[0];
        } catch (error) {
            await trx.rollback();
            throw error;
        }
    }

    // List all SOs with their associated products and customers
    async getAll() {
        return await db('sales_orders')
            .join('users', 'sales_orders.buyer_id', 'users.id')
            .select(
                'sales_orders.*',
                db.raw("CONCAT(users.first_name, ' ', users.last_name) as customer_full_name"),
                db.raw(`JSON_AGG(
                JSON_BUILD_OBJECT(
                    'product_name', products.name,
                    'quantity', sales_items.quantity,
                    'price', sales_items.rate
                )
                ) as line_items
            `)
            )
            .leftJoin('sales_items', 'sales_orders.id', 'sales_items.sale_id')
            .leftJoin('products', 'sales_items.product_id', 'products.id')
            .groupBy('sales_orders.id', 'users.id');
    }

    // Get SO by ID with its associated products and customers
    async getById(id) {
        return await db('sales_orders')
            .join('users', 'sales_orders.buyer_id', 'users.id')
            .select(
                'sales_orders.*',
                db.raw("CONCAT(users.first_name, ' ', users.last_name) as customer_full_name"),
                db.raw(`JSON_AGG(
                JSON_BUILD_OBJECT(
                    'product_name', products.name,
                    'quantity', sales_items.quantity,
                    'price', sales_items.rate
                )
                ) as line_items
            `)
            )
            .leftJoin('sales_items', 'sales_orders.id', 'sales_items.sale_id')
            .leftJoin('products', 'sales_items.product_id', 'products.id')
            .where('sales_orders.id', id)
            .groupBy('sales_orders.id', 'users.id');
    }

    // Update SO when it in draft status first chaeck if the status is draft
    async update(id, data) {
        const so = await this.getById(id);
        if (so.length > 0 && so[0]?.status !== 'PENDING') {
            throw {
                status: 403,
                message: 'Only draft SOs can be updated.'
            };
        }

        const { line_items, ...soData } = data;
        const trx = await db.transaction();
        try {
            // Remove existing sales items
            await trx('sales_items').where({ sale_id: id }).del();

            // Insert new sales items
            const lineItems = line_items.map(item => ({ ...item, sale_id: id }));
            await trx('sales_items').insert(lineItems);

            // Update sales_orders table
            const updatedSO = await trx('sales_orders')
                .where({ id })
                .update({ ...soData, updated_at: db.fn.now() })
                .returning('*');

            await trx.commit();
            return updatedSO[0];
        } catch (error) {
            await trx.rollback();
            throw error;
        }
    }

    // Update SO status
    async updateStatus(id, status) {
        return await db('sales_orders')
            .where({ id })
            .update({ status, updated_at: db.fn.now() })
            .returning('*');
    }

    // Delete SO and its line items
    async delete(id) {
        const so = await this.getById(id);
        // if sales order is not found
        if (so.length === 0) {
            throw {
                status: 404,
                message: 'Sales order not found.'
            };
        }
        if (so.length > 0 && so[0]?.status !== 'PENDING') {
            throw {
                status: 403,
                message: 'Only draft SOs can be Deleted.'
            };
        }
        const trx = await db.transaction();
        try {
            await trx('sales_items').where({ sale_id: id }).del();
            await trx('sales_orders').where({ id }).del();
            await trx.commit();
        } catch (error) {
            await trx.rollback();
            throw error;
        }
    }
}

module.exports = new SO();