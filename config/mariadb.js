
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: '192.168.100.11',
  user: 'leeuser',
  password: 'hosxp11142',
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