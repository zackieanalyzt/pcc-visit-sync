# pcc-visit-sync
ดึงรายชื่อผู้มารับบริการ ณ รพ.สต.เครือข่าย
# pcc-visit-sync

ระบบสำหรับดึงและซิงค์ข้อมูลการมาตรวจผู้ป่วยจากฐานข้อมูลโรงพยาบาล (MariaDB) ไปยัง PostgreSQL เพื่อใช้แสดงผลหรือเชื่อมต่อ dashboard

## วัตถุประสงค์
- ดึงข้อมูลผู้ป่วยจาก MariaDB (ฐานข้อมูลหลักของโรงพยาบาล)
- บันทึกข้อมูลลง PostgreSQL
- ให้ RESTful API เพื่อดึงข้อมูลแสดงผล
- รองรับ Auto Sync

## ใช้เทคโนโลยี
- Node.js + Express
- MariaDB Client
- PostgreSQL Client
- RESTful API

## การติดตั้ง
```bash
npm install
node server.js