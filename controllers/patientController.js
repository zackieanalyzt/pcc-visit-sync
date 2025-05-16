const mariadb = require('../config/mariadb');
const patientModel = require('../models/PatientModel');

exports.syncPatients = async (req, res) => {
  try {
    // 1. ดึงข้อมูลจาก MariaDB
    const sql = `
      SELECT
        ovst.vn,
        patient.hn,
        FLOOR(DATEDIFF(ovst.vstdate, patient.birthday) / 365.25) AS age,
        CASE 
          WHEN patient.sex = '1' THEN 'ชาย' 
          WHEN patient.sex = '2' THEN 'หญิง' 
          ELSE 'ไม่ระบุ' 
        END AS sex,
        LPAD(patient.moopart, 2, '0') AS village,
        tmb.name AS district_name,
        amp.name AS amphur_name,
        chw.name AS changwat_name,
        ovstdiag.icd10 AS diag_code,
        CASE 
          WHEN ovstdiag.diagtype NOT IN ('1', '2', '3', '4', '5') THEN '4'
          ELSE ovstdiag.diagtype
        END AS diag_type,
        doctor.name AS doctor,
        CAST(YEAR(ovst.vstdate) + 543 AS CHAR(4)) AS year_visit,
        LPAD(MONTH(ovst.vstdate), 2, '0') AS month_visit,
        LPAD(DAY(ovst.vstdate), 2, '0') AS date_visit,
        CASE ovst.visit_type
          WHEN 'I' THEN 'ในเวลา'
          WHEN 'O' THEN 'นอกเวลา'
          ELSE 'ไม่ระบุ'
        END AS visit_type,
        kskdepartment.department,
        pttype.name AS pttype,
        ovst.vstdate,
        ovst.vsttime
      FROM
        ovst
        INNER JOIN patient ON ovst.hn = patient.hn
        INNER JOIN opdscreen ON ovst.vn = opdscreen.vn
        INNER JOIN ovstdiag ON ovst.vn = ovstdiag.vn
        INNER JOIN doctor ON ovst.doctor = doctor.code
        INNER JOIN kskdepartment ON ovst.last_dep = kskdepartment.depcode
        INNER JOIN pttype ON ovst.pttype = pttype.pttype
        LEFT JOIN thaiaddress tmb ON tmb.chwpart = patient.chwpart 
          AND tmb.amppart = patient.amppart 
          AND tmb.tmbpart = patient.tmbpart 
          AND tmb.codetype = '3'
        LEFT JOIN thaiaddress amp ON amp.chwpart = patient.chwpart 
          AND amp.amppart = patient.amppart 
          AND amp.tmbpart = '00' 
          AND amp.codetype = '2'
        LEFT JOIN thaiaddress chw ON chw.chwpart = patient.chwpart 
          AND chw.amppart = '00' 
          AND chw.tmbpart = '00' 
          AND chw.codetype = '1'
      WHERE
        ovst.vstdate BETWEEN '2025-04-01' AND '2025-05-14'
        AND kskdepartment.depcode IN ('108','109','110')
      ORDER BY ovst.vstdate DESC, ovst.vsttime DESC
    `;

    const patients = await mariadb.query(sql);

    // 2. บันทึกลง PostgreSQL
    for (let p of patients) {
      await patientModel.insertPatient(p);
    }

    res.json({ message: "Sync เรียบร้อย", total: patients.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการ sync" });
  }
};