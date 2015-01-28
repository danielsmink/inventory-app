/**
 * Created by dsmink on 28/01/2015.
 */

var items = [
    {
        id: '0',
        name: 'Couch',
        description: 'Ikea this is comfortable!'
    },
    {
        id: '1',
        name: 'Laptop',
        description: 'Beep boop, goes the laptop.'
    },
    {
        id: '2',
        name: 'foobar',
        description: 'Just a test'
    }
];

var _ = require('lodash');

exports.list = function (req, res) {
    res.render('index', {items: items});
};

exports.show = function (req, res) {
    var item = _.find(items, {id: req.params.id});
    res.render('show', item);
};