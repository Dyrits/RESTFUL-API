const request = require('request');
const {isReadStream} = require("request/lib/helpers");

const domain = process.env.NODE_ENV === "production" ? "https://mighty-mountain-94469.herokuapp.com/" : "http://localhost:3000/";

const render = {
    countries: {
        get: (req, res) => {
            const path = "/api/countries";
            const options = {
                url: domain + path,
                method: "GET",
            };
            request(options, (error, $unused, body) => {
                const { status, countries } = JSON.parse(body)
                countries.sort((country$1, country$2) => country$1.name.localeCompare(country$2.name));
                if (error || body.error || status !== 200) { render.error(res, error, JSON.parse(body)); }
                else { res.render("countries", { title: "List of countries", countries }); }
            });
        }
    },
    country: {
        get: ({ params }, res, next) => {
            const path = `/api/countries/${params.identifier}`;
            const options = {
                url: domain + path,
                method: "GET",
            };
            request(options, (error, $unused, body) => {
                const { status, country } = JSON.parse(body)
                if (error || body.error || status !== 200) { render.error(res, error, JSON.parse(body)); }
                else { res.render("country", { title: `Country: ${country.name}`,  country }) }
            });
        },
        post: ({ body }, res, next) => {
            const path = "/api/countries";
            const options = {
                url: domain + path,
                method: "POST",
                json: body
            };
            request(options, (error, $unused, body) => {
                const { status } = body;
                if (error || body.error || status !== 201) { render.error(res, error, body); }
                else { res.redirect("/countries"); }
            });
        },
        put: ({ params, body }, res, next) => {
            const path = `/api/countries/${params.identifier}`;
            const options = {
                url: domain + path,
                method: "PUT",
                json: body
            };
            request(options, (error, $unused, body) => {
                const { status } = body;
                if (error || body.error || status !== 201) { render.error(res, error, body); }
                else { res.redirect("/countries"); }
            });
        },
        delete: ({ params }, res, next) => {
            const path = `/api/countries/${params.identifier}`;
            const options = {
                url: domain + path,
                method: "DELETE",
            };
            request(options, (error, response, body) => {
                const status = response.statusCode || body.status;
                if (error || body.error || status !== 204) { render.error(res, error, body); }
                else { res.redirect("/countries"); }
            });
        }
    },
    error: (res, error, body) => {
        res.render("error", { title: "Error", message : error?.toString() || body.error, status: body.status });
    }
}

module.exports = { render }