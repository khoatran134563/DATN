const mongoose = require('mongoose');

const ElementSchema = new mongoose.Schema({
  number: Number, symbol: String, name: String, mass: String,
  group: Number, period: Number, category: String, config: String,
  electronegativity: String, oxidation: String, melt: String,
  boil: String, discover: String, summary: String
});

module.exports = mongoose.model('ChemicalElement', ElementSchema);