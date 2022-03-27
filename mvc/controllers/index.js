
const render = {
    index: (req, res, next) => { res.render('index', { title: 'RESTful Routing' }); },
    example: (req, res, next) => { res.render('example', { title: 'Example HTTP Requests' }); }
}

const json = {
    example: {
        get: (req, res, next) => { res.json({ message: "User made a GET request." }); },
        post: (req, res, next) => { res.json({ message: "User made a POST request." }); },
        put: (req, res, next) => { res.json({ message: "User made a PUT request." }); },
        delete: (req, res, next) => { res.json({ message: "User made a DELETE request." }); }
    }
}

module.exports = {
    render, json
}
