const Truck = require('../models/Truck.js');
const { truckView } = require('../views/truckView.js');
const { paginationView } = require('../views/paginationView');
const { v4: uuidv4 } = require('uuid');


async function getAllTrucks() {
    const trucks = await Truck.find();
    const formatted = trucks.map(truck => truckView(truck));
    return formatted;
}


async function getTrucksPaginated(page = 1, size = 10) {
    const skip = (page - 1) * size;
    const totalItems = await Truck.countDocuments();
    const trucks = await Truck.find()
        .skip(skip)
        .limit(size)
        .exec();
    const items = trucks.map(truck => truckView(truck));
    return paginationView(items, totalItems, page, size);
}

async function createTruck(data) {
    await validateTruckData(data);
     const { brand, model, licensePlate, capacity } = data;
    const newtruck = new Truck({
        truckUid: uuidv4(),
        brand,
        model,
        licensePlate,
        capacity
    });
    await newtruck.save();
    return newtruck;
}


async function validateTruckData({ brand, model, licensePlate }) {
  if (!brand || !model || !licensePlate) {
    throw new Error('Brand, Model, and licensePlate are required.');
  }
  const existing = await Truck.findOne({ licensePlate });
  if (existing) {
    throw new Error(`Truck with licensePlate ${licensePlate} already exists.`);
  }
}

async function createMultipleTrucks(truckList) {
  if (!Array.isArray(truckList) || truckList.length === 0) {
    throw new Error('truckList must be a non-empty array.');
  }
  for (const data of truckList) {
    await validateTruckData(data);
  }
  const newTrucks = truckList.map(data => ({
    truckUid: uuidv4(),
    brand: data.brand,
    model: data.model,
    licensePlate: data.licensePlate,
    capacity: data.capacity,
  }));
  const insertedTrucks = await Truck.insertMany(newTrucks);
  return insertedTrucks;
}


async function getTruckByUid(truckUid) {
  const existing = await Truck.findOne({ truckUid });
  if (!existing) {
    throw new Error(`Truck with le Uid:  ${truckUid} no exists.`);
  }
  return existing;
}

async function validateTruck(truckUid) {
  const existing = await Truck.findOne({ truckUid });
  if (!existing) {
    throw new Error(`Truck with le Uid:  ${truckUid} no exists.`);
  }
}




module.exports = {
    getAllTrucks,
    getTrucksPaginated,
    createTruck,
    createMultipleTrucks,
    getTruckByUid,
    validateTruck
};