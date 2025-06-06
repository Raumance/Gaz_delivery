const truckService = require('../services/truckService');
const { truckView } = require('../views/truckView');

async function getPaginatedTrucks(req, res) {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    try {
        const result = await truckService.getTrucksPaginated(page, size);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getAllTrucks(req, res) {
    try {
        const trucks = await truckService.getAllTrucks();
        res.json(trucks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function createTruck(req, res) {
    try {
        const truck = await truckService.createTruck(req.body);
        const result = truckView(truck);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function createMultipleTrucks(req, res) {
    try {
        const trucks = await truckService.createMultipleTrucks(req.body.trucks);
        const results = trucks.map(truckView);
        res.status(201).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    getPaginatedTrucks,
    getAllTrucks,
    createTruck,
    createMultipleTrucks
};