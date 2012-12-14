// r2.js

var Room = require('../../../../src/schema/room').Room;

exports.room = new Room({
    location: 2,
    title: 'Test Room 2',
    descr: [{
        en: 'You are in a test room. There isn\'t much going on here.',
        es: 'ES-You are in a test room. There isn\'t much going on here.'
    }],
    shortDescr: [{
        en: 'You are in a test room.',
        es: 'ES-You are in a test room.'
    }],
    exits: [{
        direction: 'north',
        location: 1
    }]
});