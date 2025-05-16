
---

## 🔌 4. ตั้งค่าฐานข้อมูล

### `config/mariadb.js` – เชื่อมต่อ MariaDB

```js
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: '192.168.101.38',
  user: 'sa',
  password: '11142',
  database: 'lee',
  connectionLimit: 5
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