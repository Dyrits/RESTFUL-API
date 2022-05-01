const mongoose = require('mongoose');
const Country = mongoose.model('Country');

const data = require('../../.data/countries.js');

const render = {
    form: {
        create: (req, res, next) => {
            res.render("form", { title: "Create a country" });
        },
        update: ({ params }, res, next) => {
            Country.findOne({ identifier: params.identifier }, (error, country) => {
                if (!country) { res.$json(400, { error: "No country has been found." }); }
                else { error ? res.$json(400, { error: error?.toString() }) : res.render("form", { title: "Update a country", country }); }
            });
        }
    }
}

const json = {
    countries: {
        get: (req, res, next) => {
            Country.find((error, countries) => {
                error ? res.$json(400, { error: error?.toString() }) : res.$json(200, { countries});
            });
        }
    },
    country: {
        get: ({ params }, res, next) => {
            Country.findOne({ identifier: params.identifier }, (error, country) => {
                if (!country) { res.$json(400, { country, error: "No country has been found." }) }
                else { error ? res.$json(400, { error: error?.toString() }) : res.$json(200, { country }); }
            });
        },
        post: ({ body }, res, next) => {
            if (!body.name) { res.$json(400, { error: "Missing name for the country." }); }
            else {
                Country.find({}, null, { sort: { identifier: 1} }, (error, countries) => {
                    if (error) {
                        res.$json(400, {error: error?.toString()});
                    } else {
                        let identifier = 1;
                        for (country of countries) { if (country.identifier !== identifier) { break; } else { identifier++; } }
                        Country.create({ name: body.name, identifier }, (error, country) => {
                            error ? res.$json(400, {error: error?.toString()}) : res.$json(201, {country});
                        });
                    }
                });
            }
        },
        put: ({ body, params }, res, next) => {
            if (!body.name) { res.$json(400, { error: "Missing name for the country." }); }
            else {
                Country.findOneAndUpdate({ identifier: params.identifier }, { name: body.name }, { new: true }, (error, country) => {
                    if (!country) { res.$json(400, {country, error: "No country has been found."}) }
                    else { error ? res.$json(400, {error: error?.toString()}) : res.$json(201, {country}) }
                });
            }
        },
        delete: ({ params }, res, next) => {
            Country.findOneAndRemove({ identifier: params.identifier }, (error, country) => {
                error ? res.$json(400, { error: error?.toString() }) : res.$json(204, { country });
            });
        },
    }
}

const reset = (req, res) => {
    Country.deleteMany({}, (error) => {
        if (error) { res.$json(400, { error: error?.toString() }); }
        else {
            Country.insertMany(data, (error) => {
                if (error) { res.$json(400, { error: error?.toString() }); }
                else { res.redirect("/countries"); }
            });
        }
    });
}

module.exports = { render, json, reset };