const express = require('express');
const news_api = require('../modules/news');

const router = express.Router();

router.get('/:category', async (req, res) => {
  const obj = await news_api.topNews(req.params.category, "");
  res.json(obj);
});

router.get('/:category/:search', async (req, res) => {
  const obj = await news_api.topNews(req.params.category, req.params.search);
  res.json(obj);
});

module.exports = router;