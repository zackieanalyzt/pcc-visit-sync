const express = require('express');
const cors = require('cors');
const patientRoutes = require('./routes/patientRoute');

const app = express();
app.use(cors());
app.use('/api', patientRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API กำลังทำงานที่ http://localhost:${PORT}`);
});