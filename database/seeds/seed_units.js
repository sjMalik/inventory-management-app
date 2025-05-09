/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const units = require('./data/units.json');

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('units').del();
  await knex('units').insert(units);
};
