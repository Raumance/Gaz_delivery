// routes/driverRoutes.js
const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const { authenticateToken } = require('../middleware/authMiddleware');


router.get('/get-drivers-with-pagination', driverController.getPaginatedDrivers);
router.get('/get-all-drivers', driverController.getAllDrivers);
router.get('/salary/:driverUid', authenticateToken, driverController.getDriverSalary);
router.post('/create-driver', driverController.createDriver);
module.exports = router;
