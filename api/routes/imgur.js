const express = require('express');
const imgur_api = require('../modules/imgur');

const router = express.Router();

router.get('/search/:sort/:q', async (req, res) => {
  const obj = await imgur_api.search(req.params.q, req.params.sort);
  if (obj == null)
    res.sendStatus(404);
  else
    res.json(obj);
});

router.get('/search/:q', async (req, res) => {
  const obj = await imgur_api.search(req.params.q, null);
  if (obj == null)
    res.sendStatus(404);
  else
    res.json(obj);
});

module.exports = router;