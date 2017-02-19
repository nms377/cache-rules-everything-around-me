
const express = require('express');

const sleep = require('../services/sleep');

const cache = require('express-redis-cache')();

const router = express.Router();

router.route('/')
  .get(cache.route('/', 60), (req, res, next) => {
    return sleep(5000)
      .then(_ => res.render('api/index', (err, html) => {
        res.send(html);
      }));
  });

module.exports = router;
