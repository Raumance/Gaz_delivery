const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
  {
    deliveryUid: { type: String, unique: true },
    date: { type: Date, required: true },
    truckUid: { type: String, required: true },
    driverUid: { type: String, required: true },
    customerUid: { type: String, required: true },
    bottleUids: [{ type: String, required: true }],
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Delivery", deliverySchema);
