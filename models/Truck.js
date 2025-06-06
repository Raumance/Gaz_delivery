const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
    truckUid: { type: String, unique: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    licensePlate: { type: String, required: true, unique: true },  // plaque d’immatriculation
    capacity: { type: Number, required: true },  // capacité en nombre de bouteilles ou kg
}, {
    timestamps: true
});

module.exports = mongoose.model('Truck', truckSchema);

