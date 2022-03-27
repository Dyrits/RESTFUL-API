var express = require('express');
var router = express.Router();

let { render, json } = require("../controllers/index");


router.get('/', render.index);
router.get('/example', render.example);
router.get('/example/request', json.example.get);
router.post('/example/request', json.example.post);
router.put('/example/request', json.example.put);
router.delete('/example/request', json.example.delete);

module.exports = router;
