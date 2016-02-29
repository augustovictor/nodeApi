var r = require('request').defaults({
    json: true
});

module.exports = function(app) {
    // Read
    // New endpoint
    app.get('/pets', function(req, res) {
        // Go to the uri and execute the function once it gets back from dog's server
        r({uri: 'http://localhost:3001/dogs'},
            function(error, response, body) {
                if (!error && response.statusCode === 200) res.json(body);
                else res.send(response.statusCode);
            }
        );
    });
}