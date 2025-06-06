// routes/bottleRoutes.js
const express = require('express');
const router = express.Router();
const bottleController = require('../controllers/bottleController');

router.get('/get-bottles-with-pagination', bottleController.getPaginatedBottles);
router.get('/get-all-bottles', bottleController.getAllBottles);
router.post('/create-bottle', bottleController.createBottle);
router.post('/create-multiple-bottles', bottleController.createMultipleBottles);
module.exports = router;
