// routes/driverRoutes.js
const express = require('express');
const router = express.Router();
const truckController = require('../controllers/truckController');

router.get('/get-trucks-with-pagination', truckController.getPaginatedTrucks);
router.get('/get-all-trucks', truckController.getAllTrucks);
router.post('/create-truck', truckController.createTruck);
router.post('/create-multiple-trucks', truckController.createMultipleTrucks);
module.exports = router;
