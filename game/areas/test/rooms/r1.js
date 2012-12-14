// r1.js

var Room = require('../../../../src/schema/room').Room;

exports.room = new Room({
    location: 'test.1',
    title: 'Test Room 1',
    descr: [{
        en: 'You are in a test room. There isn\'t much going on here.',
        es: 'ES-You are in a test room. There isn\'t much going on here.'
    }],
    shortDescr: [{
        en: 'You are in a test room.',
        es: 'ES-You are in a test room.'
    }],
    exits: [{
        direction: 'south',
        location: 'test.2'
    }, {
        direction: 'north',
        location: 'test.3'
    }]
});