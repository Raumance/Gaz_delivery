const customerService = require('../services/customerService');
const { customerView } = require('./customerView');

const driverService = require('../services/driverService');
const { driverView } = require('./driverView');

const truckService = require('../services/truckService');
const { truckView } = require('./truckView');

async function deliveryView(data) {
    const customer = await customerService.getCustomerByUid(data.customerUid);
    const mappedCustomer = customerView(customer);

    const driver = await driverService.getDriverByUid(data.driverUid);
    let mappedDriver = driverView(driver);

    // ❌ Masquer certaines infos si annulée
    if (data.status === 'CANCELLED') {
        delete mappedDriver.salary;
        delete mappedDriver.totalBottlesDelivered;
    }

    // ✅ Afficher les bouteilles livrées si la livraison est complétée
    if (data.status === 'COMPLETED') {
        mappedDriver.deliveredBottleUids = driver.deliveredBottleUids || [];
    }

    const truck = await truckService.getTruckByUid(data.truckUid);
    const mappedTruck = truckView(truck);
    
    return {
        deliveryUid: data.deliveryUid,
        date: data.date,
        customer: mappedCustomer,
        truck: mappedTruck,
        driver: mappedDriver,
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    };
}

module.exports = { deliveryView };
