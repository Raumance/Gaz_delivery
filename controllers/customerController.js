const customerService = require('../services/customerService');
const { customerView } = require('../views/customerView');

async function getAllCustomers(req, res) {
    try {
        const customers = await customerService.getAllCustomers();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function createCustomer(req, res) {
    try {
        const customer = await customerService.createCustomer(req.body);
        const result = customerView(customer);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    getAllCustomers,
    createCustomer
};