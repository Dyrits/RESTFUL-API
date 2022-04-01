
const render = {
    index: (req, res, next) => { res.render('index', { title: 'RESTful Routing' }); },
    example: (req, res, next) => { res.render('example', { title: 'Example HTTP Requests' }); },
    restful: (req, res, next) => { res.render('restful', { title: 'RESTful Routing Architecture' }); },
    statusCodes: (req, res, next) => { res.render('status-codes', { title: 'HTTP Status Code' }); }
}

const json = {
    example: {
        get: (req, res, next) => { res.$json(200, { message: "User made a GET request." }); },
        post: (req, res, next) => { res.$json(201,{ message: "User made a POST request." }); },
        put: (req, res, next) => { res.$json(401,{ message: "User made a PUT request." }); },
        delete: (req, res, next) => { res.$json(500,{ message: "User made a DELETE request." }); }
    }
}

module.exports = {
    render, json
}
