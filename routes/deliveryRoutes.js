const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/get-all-deliveries', authenticateToken, deliveryController.getAllDeliveries);
router.post('/create-delivery', authenticateToken, deliveryController.createDelivery);
router.get('/delivery-details/:deliveryUid', authenticateToken, deliveryController.getDeliveryDetails);
router.put('/cancel/:deliveryUid', authenticateToken, isAdmin, deliveryController.cancelDelivery);
router.put('/complete-delivery/:deliveryUid', authenticateToken, isAdmin, deliveryController.completeDelivery);

// ✅ Route pour simuler les bouteilles vides (renvoie "empty" pour chaque bouteille)
router.put('/simulate-completed-bottles/:deliveryUid', authenticateToken, deliveryController.simulateCompletedBottlesStatus);

module.exports = router;
