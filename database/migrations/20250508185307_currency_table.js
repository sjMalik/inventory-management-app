/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    return knex.schema.createTable('currency', function(table) {
        table.increments('id').primary();
        table.string('code', 3).notNullable().unique(); // ISO 4217 currency code
        table.string('name').notNullable(); // Currency name
        table.decimal('exchange_rate', 14, 6).notNullable(); // Exchange rate relative to a base currency
        table.timestamps(true, true); // created_at and updated_at
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('currency');
};
