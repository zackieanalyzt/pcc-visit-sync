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
    ON CONFLICT (vn) DO NOTHING
  `;

  const values = [
    vn, hn, age, sex, village,
    district_name, amphur_name, changwat_name,
    diag_code, diag_type, doctor,
    year_visit, month_visit, date_visit,
    visit_type, department, pttype, vstdate, vsttime
  ];

  await query(text, values);
};