const knex = require('knex');
const config = require('../../knexfile');

const connection = knex(config.development);

module.expots = connection;


