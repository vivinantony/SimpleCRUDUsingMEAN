var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/userdata');
var userSchema = mongoose.Schema({
    name: String,
    place: String
});
var User = mongoose.model('User', userSchema);

var app = express();

app.use(express.static('./app'));
app.use(bodyParser.json());

app.get('/api', function(req, res, next) {
    User.find().exec(function(err, data) {
        if(err) {
            return next(err);
        }
        res.json(data);
    });
});

app.post('/api', function(req, res, next) {
    var user = new User({
        name: req.body.name,
        place: req.body.place
    });
    user.save(function(err, data) {
        if(err) {
            return next(err);
        }
        res.status(201).json(data);
    });
});

app.get('/api/:id', function(req, res) {
    User.findById(req.params.id, function(err, data) {
        if(err) {
            return next(err);
        }
        res.json(data);
    });
});

app.delete('/api/:id', function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, data) {
        res.json(data);
    });
});

app.put('/api/:id', function(req, res) {
    User.findById(req.params.id, function(err, user) {
        user.name = req.body.name;
        user.place = req.body.place;
        user.save(function(err, data) {
            if(err) {
                return next(err);
            }
            res.status(201).json(data);
        });
    });
});


var port = "3000";
app.listen(port);
console.log("Server running at " + port);