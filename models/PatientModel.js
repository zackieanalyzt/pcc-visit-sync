const { query } = require('../config/postgres');

exports.insertPatient = async (patient) => {
  const {
    vn, hn, age, sex, village,
    district_name, amphur_name, changwat_name,
    diag_code, diag_type, doctor,
    year_visit, month_visit, date_visit,
    visit_type, department, pttype, vstdate, vsttime
  } = patient;

  const text = `
    INSERT INTO pcc (
      vn, hn, age, sex, village,
      district_name, amphur_name, changwat_name,
      diag_code, diag_type, doctor,
      year_visit, month_visit, date_visit,
      visit_type, department, pttype, vstdate, vsttime
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
  `;

  const values = [
    vn, hn, age, sex, village,
    district_name, amphur_name, changwat_name,
    diag_code, diag_type, doctor,
    year_visit, month_visit, date_visit,
    visit_type, department, pttype, vstdate, vsttime
  ];

  try {
    await query(text, values);
  } catch (err) {
    if (err.code === '23505') {
      // ถ้ามี duplicate key error (UNIQUE VIOLATION)
      console.log(`[INFO] Record ซ้ำ: ${vn} - ข้ามการบันทึก`);
    } else {
      console.error(`Error inserting record ${vn}:`, err.message);
    }
  }
};