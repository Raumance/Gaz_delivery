const bottleService = require('../services/bottleService');
const { bottleView } = require('../views/bottleView');

async function getPaginatedBottles(req, res) {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;

    try {
        const result = await bottleService.getBottlesPaginated(page, size);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getAllBottles(req, res) {
    try {
        const bottles = await bottleService.getAllBottles();
        res.json(bottles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function createBottle(req, res) {
    try {
        const bottle = await bottleService.createBottle(req.body);
        const result = bottleView(bottle);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function createMultipleBottles(req, res) {
    try {
        const bottles = await bottleService.createMultipleBottles(req.body.bottles);
        const results = bottles.map(bottleView);
        res.status(201).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    getPaginatedBottles,
    getAllBottles,
    createBottle,
    createMultipleBottles
};