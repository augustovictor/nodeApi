var r = require('request').defaults({
    json: true
});

var async = require('async');
var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');

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
                // Check in redis if this key value exists (the url)
                client.get('http://localhost:3001/dog', function(error, dog) {
                    if (error) throw error;

                    // If it does stringify this and get me back. It is already cached
                    if (dog) {
                        callback(null, JSON.parse(dog));
                    }

                    // Otherwise go get it
                    else {
                        r({ uri: 'http://localhost:3001/dog' },
                            function(error, response, body) {
                                if (error) {
                                    callback({ service: 'dog', error: error });
                                    return;
                                };
                                if (!error && response.statusCode === 200) {
                                    callback(null, body.data);

                                    // Binds JSON.stringify(body) to the url
                                    client.set('http://localhost:3001/dog', JSON.stringify(body.data), function(error) {
                                        if (error) throw error;
                                    });
                                }
                                else callback(response.statusCode);
                            }    
                        );
                    }
                });
            }
        }, function(error, results) { // Executed when all requests are done
            res.json({
                error: error,
                results: results
            });
        });
    });
}