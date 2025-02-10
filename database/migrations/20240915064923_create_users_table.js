/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await Promise.all([
        knex.schema.createTable('users', (table) => {
            table.increments('id').primary().unsigned(),
                table.string('email').notNullable().unique(),
                table.string('password').notNullable(),
                table.string('first_name').notNullable(),
                table.string('last_name').notNullable(),
                table.enu('role', ['ADMIN', 'PURCHASING_MANAGER', 'SUPPLIER', 'SALES_MANAGER', 'CUSTOMER', 'OTHERS']),
                table.timestamp('created_at').defaultTo(knex.fn.now());
        }),
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await Promise.all([
        knex.raw('drop table if exists "users" cascade'),
    ]);
};
