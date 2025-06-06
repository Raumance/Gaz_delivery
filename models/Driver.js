const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    driverUid: { type: String, unique: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    drivingLicense: { type: String, required: true, unique: true },
    totalBottlesDelivered: { type: Number, default: 0 },
    salary: { type: Number, default: 0 },
    deliveredBottleUids: { type: [String], default: [] }
}, {
    timestamps: true
});

module.exports = mongoose.model('Driver', driverSchema);