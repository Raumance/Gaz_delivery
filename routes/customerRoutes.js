// routes/driverRoutes.js
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/get-all-customers', customerController.getAllCustomers);
router.post('/create-customer', customerController.createCustomer);
module.exports = router;
