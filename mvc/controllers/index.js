
getIndex = function(req, res, next) {
  res.render('index', { title: 'RESTful Routing' });
}
const examples = {
    HTML: {
        get: (req, res, next) => { res.render('example', { title: 'Example HTTP Requests' }); }
    },
    requests: {
        get: (req, res, next) => { res.json({ message: "User made a GET request." }); },
        post: (req, res, next) => { res.json({ message: "User made a POST request." }); },
        put: (req, res, next) => { res.json({ message: "User made a PUT request." }); },
        delete: (req, res, next) => { res.json({ message: "User made a DELETE request." }); }
    },
};

module.exports = {
    getIndex, examples
}
