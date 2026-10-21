const mongoose = require("mongoose");

const catwaySchema = new mongoose.Schema({
  catwayNumber: { type: Number, required: true },
  type: { type: String, required: true, enum: ["short", "long"] },
  catwayState: { type: String, required: true },
});

module.exports = mongoose.model("Catway", catwaySchema);
