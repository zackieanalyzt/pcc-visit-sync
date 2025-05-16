
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: '192.168.101.38',
  user: 'sa',
  password: 'sa',
  database: 'lee',
  connectionLimit: 5,
  charset: 'tis620' 
});

module.exports = {
  query: async (sql) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(sql);
      return rows;
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.release();
    }
  }
};