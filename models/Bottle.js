const mongoose = require("mongoose");

const bottleSchema = new mongoose.Schema(
  {
    bottleUid: { type: String,  required: true, unique: true }, // identifiant unique généré
    reference: { type: String, required: true, unique: true }, // référence gravée ou étiquette
    size: { type: String, enum: ["6kg", "12kg", "39kg"], required: true }, // optionnel selon entreprise
    status: {
      type: String,
      enum: ["full", "empty", "damaged"],
      default: "full",
    },
    gasType: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bottle", bottleSchema);
