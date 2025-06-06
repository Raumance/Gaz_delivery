const Delivery = require('../models/Delivery');
const Driver = require('../models/Driver');
const { v4: uuidv4 } = require('uuid');

const customerService = require('./customerService');
const driverService = require('./driverService');
const truckService = require('./truckService');
const bottleService = require('./bottleService');

const { deliveryView } = require('../views/deliveryView');
const { deliveryDetailsView } = require('../views/deliveryDetailsView');

async function getAllDeliveries() {
    const deliveries = await Delivery.find();
    const formatted = await Promise.all(
        deliveries.map(delivery => deliveryView(delivery))
    );
    return formatted;
}

async function createDelivery(data) {
    await validateDelivery(data);
    const newDelivery = new Delivery({
        deliveryUid: uuidv4(),
        date: Date.now(),
        truckUid: data.truckUid,
        driverUid: data.driverUid,
        customerUid: data.customerUid,
        bottleUids: data.bottleUids,
        status: "INPROGRESS"
    });
    await newDelivery.save();
    return await deliveryView(newDelivery);
}

async function completeDelivery(deliveryUid) {
    const delivery = await getDeliveryByUid(deliveryUid);

    if (delivery.status === "COMPLETED") {
        throw new Error("Cette livraison est déjà complétée.");
    }

    delivery.status = "COMPLETED";
    await delivery.save();

    const bottlesDelivered = delivery.bottleUids.length;

    const driver = await Driver.findOne({ driverUid: delivery.driverUid });
    if (!driver) {
        throw new Error("Chauffeur introuvable.");
    }

    driver.totalBottlesDelivered = (driver.totalBottlesDelivered || 0) + bottlesDelivered;
    driver.salary = driver.totalBottlesDelivered * 500;

    driver.deliveredBottleUids = [
        ...new Set([...(driver.deliveredBottleUids || []), ...delivery.bottleUids])
    ];

    await driver.save();

    await bottleService.deleteBottlesByUids(delivery.bottleUids);

    return await deliveryView(delivery);
}

async function cancelDelivery(deliveryUid) {
    const delivery = await getDeliveryByUid(deliveryUid);

    if (delivery.status === "COMPLETED") {
        throw new Error("Impossible d'annuler une livraison déjà complétée.");
    }

    delivery.status = "CANCELLED";
    await delivery.save();

    return await deliveryView(delivery);
}

async function getDeliveryDetails(deliveryUid) {
    const delivery = await getDeliveryByUid(deliveryUid);
    return await deliveryDetailsView(delivery);
}

// ✅ Toutes les bouteilles sont retournées en "empty"
async function simulateCompletedBottlesStatus(deliveryUid) {
    const delivery = await getDeliveryByUid(deliveryUid);
    const mapped = await deliveryDetailsView(delivery);

    mapped.bottles = mapped.bottles.map(bottle => ({
        ...bottle,
        status: 'empty'
    }));

    return mapped;
}

async function getDeliveryByUid(deliveryUid) {
    const existing = await Delivery.findOne({ deliveryUid });
    if (!existing) {
        throw new Error(`Delivery with deliveryUid: ${deliveryUid} does not exist.`);
    }
    return existing;
}

async function validateDelivery(data) {
    await customerService.validateCustomer(data.customerUid);
    await driverService.validateDriver(data.driverUid);
    await truckService.validateTruck(data.truckUid);
    await bottleService.validateBottles(data.bottleUids);
}

module.exports = {
    getAllDeliveries,
    createDelivery,
    completeDelivery,
    cancelDelivery,
    getDeliveryDetails,
    simulateCompletedBottlesStatus
};
