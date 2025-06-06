const Driver = require("../models/Driver.js");
const Bottle = require("../models/Bottle.js");
const { v4: uuidv4 } = require("uuid");
const Truck = require("../models/Truck.js");
const Customer = require("../models/Customer.js");
const InitDataService = require('../services/initDataService');
const { generateBottles } = require('../utils/bottleUtils');

const Role = require('../models/Role.js');
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');

// ------------------------------------------------------------------------------------------

//                     INIT DRIVERS()

// ------------------------------------------------------------------------------------------

async function initializeDrivers() {
    try {
        await Driver.deleteMany({});
        console.log('🗑️  All drivers deleted.');
        const driversData = InitDataService.getDriversData();
        const drivers = driversData.map(driver => ({
            driverUid: uuidv4(),
            deliveredBottleCount: 0,
            ...driver
        }));
        await Driver.insertMany(drivers);
        console.log('✅ Drivers initialized successfully!');
    } catch (err) {
        console.error('❌ Error initializing drivers:', err);
    }
}


// ------------------------------------------------------------------------------------------

//                     INIT TRUCKS()

// ------------------------------------------------------------------------------------------

async function initializeTrucks() {
    try {
        await Truck.deleteMany({});
        console.log('🗑️  All trucks deleted.');
        const trucksData = InitDataService.getTrucksData();
        const trucks = trucksData.map(truck => ({
            truckUid: uuidv4(),
            ...truck
        }));
        await Truck.insertMany(trucks);
        console.log('✅ Trucks initialized successfully!');
    } catch (err) {
        console.error('❌ Error initializing trucks:', err);
    }
}


// ------------------------------------------------------------------------------------------

//                     INIT CUSTOMERS()

// ------------------------------------------------------------------------------------------

async function initializeCustomers() {
    try {
        await Customer.deleteMany({});
        console.log('🗑️  All customers deleted.');
        const customersData = InitDataService.getCustomersData();
        const customers = customersData.map(customer => ({
            customerUid: uuidv4(),
            ...customer
        }));
        await Customer.insertMany(customers);
        console.log('✅ Customers initialized successfully!');
    } catch (err) {
        console.error('❌ Error initializing customers:', err);
    }
}


// ------------------------------------------------------------------------------------------

//                     INIT BOTTLES()

// ------------------------------------------------------------------------------------------

async function initializeBottles() {
    try {
        await Bottle.deleteMany({});
        console.log("🗑️  All bottles deleted.");
        const bottles = generateBottles(50);
        await Bottle.insertMany(bottles);
        console.log("✅ 50 bottles initialized successfully with alternating full status and realistic references!");
    } catch (err) {
        console.error("❌ Error initializing bottles:", err);
    }
}




// ------------------------------------------------------------------------------------------

//                     INIT ROLES()

// ------------------------------------------------------------------------------------------

async function initializeRoles() {
    const roles = ['ADMIN', 'CONTROLLER'];
    await Role.deleteMany({});
        console.log("🗑️  All roles deleted.");
    for (const roleName of roles) {
        const existing = await Role.findOne({ name: roleName });
        if (!existing) {
            const newRole = new Role({
                roleUid: uuidv4(),
                name: roleName
            });
            await newRole.save();
            console.log(`Role ${roleName} created`);
        } else {
            console.log(`Role ${roleName} already exists`);
        }
    }
}


// ------------------------------------------------------------------------------------------

//                     INIT USERS()

// ------------------------------------------------------------------------------------------

async function initializeUsers() {
    const users = [
        {
          username: "rogel",
          password: "1234",
          roleName: "ADMIN"
        },
        {
          username: "romance",
          password: "1234",
          roleName: "CONTROLLER"
        }
    ];
    await User.deleteMany({});
        console.log("🗑️  All users deleted.");

    for (const user of users) {
        const existing = await User.findOne({ username: user.username });
        if (!existing) {
            createUser(user.username, user.password, user.roleName)
        } else {
            console.log(`Role ${roleName} already exists`);
        }
    }
}

async function createUser(username, password, roleName) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = await Role.findOne({ name: roleName });
    if (!role) {
        throw new Error(`Role ${roleName} not found`);
    }
    const newUser = new User({
        userUid: uuidv4(),
        username,
        password: hashedPassword,
        role: role._id
    });
    await newUser.save();
}

module.exports = {
  initializeDrivers,
  initializeBottles,
  initializeTrucks,
  initializeCustomers,
  initializeRoles,
  initializeUsers
};
