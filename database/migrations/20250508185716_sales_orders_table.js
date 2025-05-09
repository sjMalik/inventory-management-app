/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    return knex.schema.createTable('sales_orders', (table) => {
        table.increments('id').primary().unsigned();                     // Unique identifier for each sale
        table.integer("buyer_id").references("id").inTable("users");     // Reference to buyer (customer/user table)
        table.decimal('total', 32, 18);                                   // Total amount for the sale
        table.integer("currency_id").references("id").inTable("currency"); // Currency used for the transaction
        table.string('notes').nullable();                                 // Optional notes for the sale
        table.string('terms').nullable();                                 // Terms and conditions, if any
        table.enum('status', ['PENDING', 'PREPARING', 'INVOICED', 'PAID', 'CANCELLED']).defaultTo('PENDING'); // Current status of the sale
        table.timestamp('packed').nullable();                             // When items were packed for delivery
        table.timestamp('delivered').nullable();                          // When delivery was completed
        table.timestamp('created_at').defaultTo(knex.fn.now());           // Auto-generated timestamp for record creation
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('units');
};
