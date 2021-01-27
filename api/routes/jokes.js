const express = require('express');
const jokes_api = require('../modules/jokes');

const router = express.Router();

router.get('/random', async (req, res) => {
  const obj = await jokes_api.getRandom();
  res.json(obj);
});

router.get('/:category', async (req, res) => {
  const obj = await jokes_api.getRandomCategory(req.params.category);
  res.json(obj);
});

module.exports = router;