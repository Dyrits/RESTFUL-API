const express = require("express");
const router = express.Router();

const { render, json, reset } = require("../controllers/countries");

const guard = (request, response, next) => {
    if (request.get("host") !== "localhost:3000") {
        response.render("error", { title: "Error (403)", status: 403, message: "Cannot create, update or delete countries from this domain." });
    } else { next(); }
}

router.route("/countries/new")
    .get(guard, render.form.create);
router.route("/countries/:identifier/edit")
    .get(guard, render.form.update);
router.route("/countries/:identifier")
    .get(json.country.get)
    .put(guard, json.country.put)
    .delete(guard, json.country.delete);
router.route("/countries")
    .get(json.countries.get)
    .post(guard, json.country.post);
router.route("/reset").get(reset);

module.exports = router;