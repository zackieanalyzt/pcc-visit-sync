const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.get('/patients/sync', patientController.syncPatients);

module.exports = router;