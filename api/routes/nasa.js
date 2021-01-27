const express = require('express');
const nasa_api = require('../modules/nasa');

const router = express.Router();

router.get('/apod/:date', async (req, res) => {
  const obj = await nasa_api.getAPOD(req.params.date);
  res.json(obj);
});

router.get('/mars/:camera', async (req, res) => {
  const obj = await nasa_api.getCuriosityPhoto(req.params.camera);
  res.json(obj);
});

module.exports = router;