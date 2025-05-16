const express = require('express');
const path = require('path');
const cors = require('cors');
const patientRoutes = require('./routes/patientRoute');

const app = express();
app.use(cors());

// ✅ เพิ่มบรรทัดนี้ เพื่อ serve ไฟล์ HTML
app.use(express.static(path.join(__dirname, 'public')));

// หรือจะกำหนด route `/` ให้ส่งไฟล์ index.html เองก็ได้
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api', patientRoutes);

const PORT = process.env.PORT || 3001; // เปลี่ยนจาก 3000 เป็น 3001
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API กำลังทำงานที่ http://localhost:${PORT}`);
});