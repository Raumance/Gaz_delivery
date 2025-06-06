const Customer = require('../models/Customer.js');
const { customerView } = require('../views/customerView.js');
const { v4: uuidv4 } = require('uuid');


async function getAllCustomers() {
    const customers = await Customer.find();
    const formatted = customers.map(customer => customerView(customer));
    return formatted;
}

async function createCustomer(data) {
    await validateCustomerData(data);
    const { name, phoneNumber, customerType} = data;
    const newCustomer = new Customer({
        customerUid: uuidv4(),
        name,
        phoneNumber,
        customerType
    });
    await newCustomer.save();
    return newCustomer;
}


async function validateCustomerData({ phoneNumber }) {
  if (!phoneNumber) {
    throw new Error('PhoneNumber is required.');
  }
  const existing = await Customer.findOne({ phoneNumber });
  if (existing) {
    throw new Error(`Customer with PhoneNumber ${phoneNumber} already exists.`);
  }
}

async function getCustomerByUid(customerUid) {
  const existing = await Customer.findOne({ customerUid });
  if (!existing) {
    throw new Error(`Customer with customerUid:  ${customerUid} no exists.`);
  }
  return existing;
}

async function validateCustomer(customerUid) {
  const existing = await Customer.findOne({ customerUid });
  if (!existing) {
    throw new Error(`Customer with customerUid:  ${customerUid} no exists.`);
  }
}


module.exports = {
    getAllCustomers,
    createCustomer,
    getCustomerByUid,
    validateCustomer
};