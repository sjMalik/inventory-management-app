/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('purchase_orders', (table) => {
        table.increments('id').primary().unsigned();
        table.integer('product_id').unsigned().notNullable().references('id').inTable('products');
        table.integer('supplier_id').unsigned().notNullable().references('id').inTable('users');
        table.integer('created_by').unsigned().notNullable().references('id').inTable('users'); // PM
        table.integer('quantity').notNullable();
        table.decimal('price', 10, 2).notNullable(); // price per unit
        table.enu('status', [
          'PENDING_SUPPLIER_CONFIRMATION',
          'CONFIRMED_BY_SUPPLIER',
          'DELIVERED_BY_SUPPLIER',
          'GOODS_RECEIVED'
        ]).defaultTo('PENDING_SUPPLIER_CONFIRMATION');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('purchase_orders');
};
