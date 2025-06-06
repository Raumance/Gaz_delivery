
const customerService = require('../services/customerService');
const { customerView } = require('./customerView');

const driverService = require('../services/driverService');
const { driverView } = require('./driverView');

const truckService = require('../services/truckService');
const { truckView } = require('./truckView');


const bottleService = require('../services/bottleService');


async function deliveryDetailsView(data) {
    const customer = await customerService.getCustomerByUid(data.customerUid);
    const mappedCustomer = customerView(customer);

    const driver = await driverService.getDriverByUid(data.driverUid);
    const mappedDriver = driverView(driver);

    const truck = await truckService.getTruckByUid(data.truckUid);
    const mappedTruck = truckView(truck);

     const bottles = await bottleService.getBottlesByUids(data.bottleUids);
    
    return {
        deliveryUid: data.deliveryUid,
        date: data.date,
        customer: mappedCustomer,
        truck: mappedTruck,
        driver: mappedDriver,
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        bottles: bottles
    };
}


module.exports = { deliveryDetailsView };