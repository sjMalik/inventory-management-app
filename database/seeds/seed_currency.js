/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const currencies = require('./data/currency.json');

exports.seed = async function(knex) {  // Deletes ALL existing entries
  await knex('currency').del()
  await knex('currency').insert(currencies);
};
