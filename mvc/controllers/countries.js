const axios = require('axios');

// Match the previous `request` behavior: never reject on non-2xx statuses.
const http = axios.create({ validateStatus: () => true });

const domain = (process.env.NODE_ENV === "production" ? process.env.APP_URL : "http://localhost:3000/").replace(/\/$/, "");

const render = {
    countries: {
        get: (req, res) => {
            const path = "/api/countries";
            http.get(domain + path).then((response) => {
                const body = response.data;
                const { status, countries } = body;
                countries.sort((country$1, country$2) => country$1.name.localeCompare(country$2.name));
                if (body.error || status !== 200) { render.error(res, null, body); }
                else { res.render("countries", { title: "List of countries", countries }); }
            }).catch((error) => { render.error(res, error, { status: 500 }); });
        }
    },
    country: {
        get: ({ params }, res, next) => {
            const path = `/api/countries/${params.identifier}`;
            http.get(domain + path).then((response) => {
                const body = response.data;
                const { status, country } = body;
                if (body.error || status !== 200) { render.error(res, null, body); }
                else { res.render("country", { title: `Country: ${country.name}`,  country }) }
            }).catch((error) => { render.error(res, error, { status: 500 }); });
        },
        post: ({ body }, res, next) => {
            const path = "/api/countries";
            http.post(domain + path, body).then((response) => {
                const { status } = response.data;
                if (response.data.error || status !== 201) { render.error(res, null, response.data); }
                else { res.redirect("/countries"); }
            }).catch((error) => { render.error(res, error, { status: 500 }); });
        },
        put: ({ params, body }, res, next) => {
            const path = `/api/countries/${params.identifier}`;
            http.put(domain + path, body).then((response) => {
                const { status } = response.data;
                if (response.data.error || status !== 201) { render.error(res, null, response.data); }
                else { res.redirect("/countries"); }
            }).catch((error) => { render.error(res, error, { status: 500 }); });
        },
        delete: ({ params }, res, next) => {
            const path = `/api/countries/${params.identifier}`;
            http.delete(domain + path).then((response) => {
                const body = response.data;
                const status = response.status || body.status;
                if (body.error || status !== 204) { render.error(res, null, body); }
                else { res.redirect("/countries"); }
            }).catch((error) => { render.error(res, error, { status: 500 }); });
        }
    },
    error: (res, error, body) => {
        res.render("error", { title: "Error", message : error?.toString() || body.error, status: body.status });
    }
}

module.exports = { render }
