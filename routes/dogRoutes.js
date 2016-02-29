var _ = require('lodash');
var Dog = require('../models/dogModel.js');

module.exports = function(app) {

    // Declare the model and tell it what to do

    // Create
    app.post('/dog', function(req, res) {
        var newDog = new Dog(req.body);
        newDog.save(function(err) {
        	if (err) res.json({info: 'Error during create dog', error: err});
        	res.json({info: 'Dog created successfully'});
        });
    });

    // Read
    app.get('/dog', function(req, res) {
    	Dog.find(function(err, dogs) {
        	if (err) res.json({info: 'Error during create dog', error: err});
        	res.json({info: 'Dogs found successfully', data: dogs});

    	});
    });

    app.get('/dog/:id', function(req, res) {
    	Dog.findById(req.params.id, function(err, dog) {
    		if (err) res.json({info: 'Error during find dog', error: err});
    		if (dog) res.json({info: 'Dog found successfully', data: dog});
    		else res.json({info: 'Dog not found'});
    	});

    })
    
    // Update
    app.put('/dog/:id', function(req, res) {
    	Dog.findById(req.params.id, function(err, dog) {
    		if (err) res.json({info: 'Error during update dog', error: err});
    		if (dog) {
    			_.merge(dog, req.body);

    			dog.save(function(err, dog) {
    				if (err) res.json({info: 'Error during save dog', error: err});
    				res.json({info: 'Dog updated successfully', data: dog});
    			});
    		}
    	});
    });

    // Delete
    app,delete('/dog/:id', function(req, res) {
    	Dog.findByIdAndRemove(req.params.id, function(err) {
    		if (err) res.json({info: 'Error during remove dog', error: err});
    		res.json({info: 'Dog removed successfully'});
    	});
    });
};