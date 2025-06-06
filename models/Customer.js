const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerUid: { type: String, unique: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    customerType: { type: String, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);