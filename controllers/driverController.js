const driverService = require('../services/driverService');
const { driverView } = require('../views/driverView');
const Driver = require('../models/Driver');

async function getPaginatedDrivers(req, res) {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;

    try {
        const result = await driverService.getDriversPaginated(page, size);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getAllDrivers(req, res) {
    try {
        const drivers = await driverService.getAllDrivers();
        res.json(drivers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function createDriver(req, res) {
    try {
        const driver = await driverService.createDriver(req.body);
        const result = driverView(driver);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getDriverSalary(req, res) {
    try {
        const { driverUid } = req.params;
        const driver = await Driver.findOne({ driverUid });

        if (!driver) {
            return res.status(404).json({ error: "Chauffeur non trouvé" });
        }

        res.json({
            driverUid: driver.driverUid,
            name: driver.name,
            totalBottlesDelivered: driver.totalBottlesDelivered,
            salary: driver.salary
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getPaginatedDrivers,
    getAllDrivers,
    createDriver,
    getDriverSalary  // ← nouvelle fonction ajoutée ici
};
