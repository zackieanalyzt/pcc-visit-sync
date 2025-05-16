const { Pool } = require('pg');

const pool = new Pool({
  host: '192.168.100.70',
  user: 'postgres',
  password: 'grespost',
  database: 'databank2',
  port: 5432
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};