const express = require('express');
const cocktail_api = require('../modules/cocktail');

const router = express.Router();

router.get('/search/ingredient/:ingredient', async (req, res) => {
  const obj = await cocktail_api.searchByIngredient(req.params.ingredient);
  if (obj == null)
    res.sendStatus(404);
  else
    res.json(obj);
});

router.get('/lookup/:id', async (req, res) => {
  const obj = await cocktail_api.lookupById(req.params.id);
  res.json(obj);
});

module.exports = router;