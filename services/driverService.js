const Driver = require('../models/Driver.js');
const { driverView } = require('../views/driverView.js');
const { paginationView } = require('../views/paginationView');
const { v4: uuidv4 } = require('uuid');


async function getAllDrivers() {
    const drivers = await Driver.find();
    const formatted = drivers.map(driver => driverView(driver));
    return formatted;
}

async function getDriversPaginated(page = 1, size = 10) {
    const skip = (page - 1) * size;
    const totalItems = await Driver.countDocuments();
    const drivers = await Driver.find()
        .skip(skip)
        .limit(size)
        .exec();
    const items = drivers.map(driver => driverView(driver));
    return paginationView(items, totalItems, page, size);
}


async function createDriver(data) {
    const { name, phoneNumber, drivingLicense, salary } = data;
    if (!name || !phoneNumber || !drivingLicense) {
        throw new Error('Name, phoneNumber, and drivingLicense are required.');
    }
    const existingDriver = await Driver.findOne({
        $or: [{ phoneNumber }, { drivingLicense }]
    });
    if (existingDriver) {
        throw new Error('Driver with this phoneNumber or drivingLicense already exists.');
    }
    const newDriver = new Driver({
        name,
        phoneNumber,
        drivingLicense,
        salary: salary || 0
    });
    await newDriver.save();
    return newDriver;
}

async function getDriverByUid(driverUid) {
  const existing = await Driver.findOne({ driverUid });
  if (!existing) {
    throw new Error(`Driver with le Uid:  ${driverUid} no exists.`);
  }
  return existing;
}

async function validateDriver(driverUid) {
  const existing = await Driver.findOne({ driverUid });
  if (!existing) {
    throw new Error(`Driver with le Uid:  ${driverUid} no exists.`);
  }
}


module.exports = {
    getDriversPaginated,
    getAllDrivers,
    createDriver,
    getDriverByUid,
    validateDriver
};