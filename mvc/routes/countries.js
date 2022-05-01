const express = require("express");
const router = express.Router();

const { render } = require("../controllers/countries");

router.route("/:identifier")
    .get(render.country.get)
    .put(render.country.put)
    .delete(render.country.delete);
router.route("/")
    .get(render.countries.get)
    .post(render.country.post);

module.exports = router;