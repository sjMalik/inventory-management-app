/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    return knex.schema.createTable('sales_items', (table) => {
        table.increments('id').primary().unsigned();                    // Unique ID for each item
        table.integer("sale_id").references("id").inTable("sales_orders").onDelete("CASCADE"); // FK to sale; if sale is deleted, items are too
        table.integer("product_id").references("id").inTable("products"); // Product being sold
        table.decimal('quantity', 32, 18);                               // Quantity of product
        table.decimal('rate', 32, 18);                                   // Rate per unit
        table.integer('unit_id').references("id").inTable("units");       // Unit (e.g., kg, pcs)
        table.decimal('amount', 32, 18);                                 // rate × quantity
        table.timestamp('created_at').defaultTo(knex.fn.now());          // Timestamp when item was added
    });
    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('units');
};
