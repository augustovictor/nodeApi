var r = require('request').defaults({
    json: true
});

var async = require('async');

module.exports = function(app) {
    // Read

    // New endpoint
    app.get('/pets', function(req, res) {
        async.parallel({
            cat: function(callback) {
                r({uri: 'http://localhost:3000/cat'},
                    function(error, response, body) {
                        if(error) {
                            callback({service: 'cat', error: error});
                            return;
                        };
                        if (!error && response.statusCode === 200) 
                            callback(null, body.data); // 'null' => error
                        else callback(response.statusCode); // response.statusCode => error. The code stops.
                    }
                );
            },
            dog: function(callback) {
                r({ uri: 'http://localhost:3001/dog' },
                    function(error, response, body) {
                        if (error) {
                            callback({ service: 'dog', error: error });
                            return;
                        };
                        if (!error && response.statusCode === 200)
                            callback(null, body.data);
                        else callback(response.statusCode);
                    }    
                );
            }
        }, function(error, results) { // Executed when all requests are done
            res.json({
                error: error,
                results: results
            });
        });
    });
}