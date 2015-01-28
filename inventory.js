/**
 * Created by dsmink on 28/01/2015.
 */

var items = [
    {
        name: 'Couch',
        description: 'Ikea this is comfortable!'
    },
    {
        name: 'Laptop',
        description: 'Beep boop, goes the laptop.'
    },
    {
        name: 'foobar',
        description: 'Just a test'
    }
];

exports.list = function (req, res) {
    res.render('index', {items: items});
};