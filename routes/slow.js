
const express = require('express');

const sleep = require('../services/sleep');

const router = express.Router();

const redis = require('redis');

const client = redis.createClient();

client.on('connect', function() {
	console.log(' connected');
});

router.route('/')
  .get((req, res, next) => {
  	console.log('reqUrl', req.url);
    return sleep(5000)
      .then(_ => res.render('api/index', (err, html) => {

		  	client.setex('./slow', 20, `${req.url}`);

				client.get('./slow', function (err, reply) {
					console.log('err', err, 'reply', reply);
				});
        res.send(html);
      }));
  });

module.exports = router;
