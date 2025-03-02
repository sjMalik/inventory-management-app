/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('products', (table) => {
        table.increments('id').primary().unsigned(); // Auto-incrementing primary key
        table.string('name').notNullable(); // Product name
        table.text('description'); // Product description
        table.decimal('price', 10, 2).notNullable(); // Product price with two decimal places
        table.integer('stock_quantity').notNullable().defaultTo(0); // Available stock
        table.enu('status', ['ACTIVE', 'INACTIVE']).defaultTo('ACTIVE'); // Product status
        table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp when product is created
        table.timestamp('updated_at').defaultTo(knex.fn.now()); // Timestamp when product is updated
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('products'); // Rollback: Drop products table
};