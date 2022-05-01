const express = require("express");
const router = express.Router();

const { render, json, reset } = require("../controllers/countries");

router.route("/countries/new")
    .get(render.form.create);
router.route("/countries/:identifier/edit")
    .get(render.form.update);
router.route("/countries/:identifier")
    .get(json.country.get)
    .put(json.country.put)
    .delete(json.country.delete);
router.route("/countries")
    .get(json.countries.get)
    .post(json.country.post);
router.route("/reset").get(reset);

module.exports = router;