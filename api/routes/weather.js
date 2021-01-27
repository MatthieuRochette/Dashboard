const express = require('express');
const weather_api = require('../modules/owm');

const router = express.Router();

router.get('/:city', async (req, res) => {
  const obj = await weather_api.fromCity(req.params.city);
  res.json(obj);
});

module.exports = router;