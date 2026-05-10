const express = require('express');
const router = express.Router();
const ChemicalElement = require('../models/ChemicalElement');

router.get('/', async (req, res) => {
  try {
    const elements = await ChemicalElement.find().sort({ number: 1 });
    res.json(elements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;