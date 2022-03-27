var express = require('express');
var router = express.Router();

let { getIndex, examples } = require("../controllers/index");


router.get('/', getIndex);
router.get('/example', examples.HTML.get);
router.get('/example/request', examples.requests.get);
router.post('/example/request', examples.requests.post);
router.put('/example/request', examples.requests.put);
router.delete('/example/request', examples.requests.delete);

module.exports = router;
