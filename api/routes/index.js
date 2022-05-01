const express = require("express");
const router = express.Router();

const { render, json } = require("../controllers/countries");

router.route("/countries/new")
    .get(render.form.create);
router.route("/countries/:id/edit")
    .get(render.form.update);
router.route("/countries/:id")
    .get(json.country.get)
    .put(json.country.put)
    .delete(json.country.delete);
router.route("/countries")
    .get(json.countries.get)
    .post(json.country.post);

module.exports = router;