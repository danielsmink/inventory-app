/**
 * Created by dsmink on 28/01/2015.
 */

var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    _id: Number,
    name: String,
    description: String
})

var Item = mongoose.model('Item', itemSchema);

var items = [];

var _ = require('lodash');

function getRecord (req, callback) {
    Item.findOne({'_id':req.params.id}, function (err, item) {
        if (err) {
            console.error(err);
        }

        callback(err, err ? null : item);
    });
}

exports.list = function (req, res) {
    Item.find(function (err, items) {
        if(err) {
            console.error(err);
        }
        res.render('index', {items: items});
    });
};

exports.show = function (req, res) {
    getRecord(req, function (err, item) {
        res.render('show', item);
    });
};

exports.new = function (req, res) {
    res.render('new');
};

exports.create = function (req, res) {
    if(!req.body.name) {
        res.send('Inventory item needs at least a name');
        res.statusCode = 400;
    } else {
        var item = new Item({
            _id: _.uniqueId(),
            name: req.body.name,
            description: req.body.description
        });
        item.save(function (err, item) {
            if(err) {
               return console.error(err);
            }
            res.redirect('/');
        });
    }
};

exports.edit = function (req, res) {
    getRecord(req, function (err, item) {
        res.render('edit', item);
    });
};

exports.update = function (req, res) {
    var id = req.params.id;

    Item.findByIdAndUpdate(id, {
        name: req.body.name,
        description: req.body.description
    }, function (err, result) {
        if (err) {
            console.error(err);
        }
        res.redirect('/' + id);
    });

};

exports.delete = function (req, res) {
    Item.remove({'_id': req.params.id}, function (err, result){
        if (err) {
           console.error(err);
        }
        res.json({success: true});
    });
};