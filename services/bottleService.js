const Bottle = require('../models/Bottle.js');
const { bottleView } = require('../views/bottleView');
const { paginationView } = require('../views/paginationView');
const { v4: uuidv4 } = require('uuid');

async function getAllBottles() {
    const bottles = await Bottle.find();
    const formatted = bottles.map(bottle => bottleView(bottle));
    return formatted;
}

async function getBottlesByUids(bottleUids) {
    const bottles = await Promise.all(
        bottleUids.map(async bottleUid => {
            const bottle = await getBottleByUid(bottleUid);
            return bottleView(bottle);
        })
    );
    return bottles;
}

async function getBottleByUid(bottleUid) {
    const existing = await Bottle.findOne({ bottleUid });
    if (!existing) {
        throw new Error(`Bottle with bottleUid: ${bottleUid} no exists.`);
    }
    return existing;
}

async function getBottlesPaginated(page = 1, size = 10) {
    const skip = (page - 1) * size;
    const totalItems = await Bottle.countDocuments();
    const bottles = await Bottle.find()
        .skip(skip)
        .limit(size)
        .exec();
    const items = bottles.map(bottle => bottleView(bottle));
    return paginationView(items, totalItems, page, size);
}

async function createBottle(data) {
    validateBottleData(data);
    const { reference, size, gasType, status } = data;
    const newBottle = new Bottle({
        bottleUid: uuidv4(),
        reference,
        size,
        gasType,
        status: status || 'full'
    });
    await newBottle.save();
    return newBottle;
}

async function createMultipleBottles(bottleList) {
    if (!Array.isArray(bottleList) || bottleList.length === 0) {
        throw new Error('bottleList must be a non-empty array.');
    }
    for (const data of bottleList) {
        await validateBottleData(data);
    }
    const newBottles = bottleList.map(data => ({
        bottleUid: uuidv4(),
        reference: data.reference,
        size: data.size,
        gasType: data.gasType,
        status: data.status || 'full'
    }));
    const insertedBottles = await Bottle.insertMany(newBottles);
    return insertedBottles;
}

async function validateBottleData({ reference, size, gasType }) {
    if (!reference || !size || !gasType) {
        throw new Error('Reference, size, and gasType are required.');
    }
    const existing = await Bottle.findOne({ reference });
    if (existing) {
        throw new Error(`Bottle with reference ${reference} already exists.`);
    }
}

async function validateBottle(bottleUid) {
    const existing = await Bottle.findOne({ bottleUid });
    if (!existing) {
        throw new Error(`Bottle with bottleUid: ${bottleUid} no exists.`);
    }
}

async function validateBottles(bottleList) {
    if (!Array.isArray(bottleList) || bottleList.length === 0) {
        throw new Error('bottleList must be a non-empty array.');
    }
    for (const data of bottleList) {
        await validateBottle(data);
    }
}

// ✅ Supprimer les bouteilles par leurs UIDs
async function deleteBottlesByUids(bottleUids) {
    await Bottle.deleteMany({ bottleUid: { $in: bottleUids } });
}

module.exports = {
    getAllBottles,
    getBottlesByUids,
    getBottleByUid,
    getBottlesPaginated,
    createBottle,
    createMultipleBottles,
    validateBottle,
    validateBottles,
    deleteBottlesByUids
};
