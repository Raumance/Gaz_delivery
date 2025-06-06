const deliveryService = require('../services/deliveryService');

async function getAllDeliveries(req, res) {
    try {
        const deliveries = await deliveryService.getAllDeliveries();
        res.json(deliveries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function createDelivery(req, res) {
    try {
        const delivery = await deliveryService.createDelivery(req.body);
        res.status(201).json(delivery);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function completeDelivery(req, res) {
    try {
        const { deliveryUid } = req.params;
        const result = await deliveryService.completeDelivery(deliveryUid);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getDeliveryDetails(req, res) {
    try {
        const { deliveryUid } = req.params;
        const result = await deliveryService.getDeliveryDetails(deliveryUid);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function cancelDelivery(req, res) {
    try {
        const { deliveryUid } = req.params;
        const result = await deliveryService.cancelDelivery(deliveryUid);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// ✅ Route pour simuler des bouteilles "vides"
async function simulateCompletedBottlesStatus(req, res) {
    try {
        const { deliveryUid } = req.params;
        const result = await deliveryService.simulateCompletedBottlesStatus(deliveryUid);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllDeliveries,
    createDelivery,
    completeDelivery,
    getDeliveryDetails,
    cancelDelivery,
    simulateCompletedBottlesStatus
};
