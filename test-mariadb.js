const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: '192.168.101.38',
  user: 'sa',
  password: 'sa',
  database: 'lee',
  connectionLimit: 5
});

async function testMariaDB() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT 1 AS connected");
    console.log("เชื่อมต่อ MariaDB สำเร็จ!", rows);
  } catch (err) {
    console.error("เชื่อมต่อ MariaDB ไม่ได้:", err.message);
  } finally {
    if (conn) conn.release();
  }
}

testMariaDB();