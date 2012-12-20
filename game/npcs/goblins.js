// goblins.js

// a few gobbos to pre-pop the world
var Npc = require('../../src/schema/npc').Npc;
var extend = require('extend');

var nasty = {
    title: [{
        en: 'Nasty Goblin',
        es: 'ES-Nasty Goblin'
    }],
    name: 'Goblin',
    keywords: [{
        en: 'goblin',
        es: 'goblino'
    }],
    shortDescr: [{
        en: 'A nasty goblin sneers at you.',
        es: 'ES-A nasty goblin sneers at you.'
    }],
    description: [{
        en: 'A tiny green little creature wearing tattered clothing, licks a knife and snarls in your direction.',
        es: 'ES-A tiny green little creature wearing tattered clothing, licks a knife and snarls in your direction.'
    }],
    behaviors: [],
    attributes: {
        max_health: 5,
        health: 5,
        speed: 1,
        damage: '1-8',
        level: 1,
        experience: 50
    },
    load_max: 8
};

var gobs = [];
gobs.push(new Npc(extend(nasty, {location: 'test.1'})));
gobs.push(new Npc(extend(nasty, {location: 'test.3'})));
gobs.push(new Npc(extend(nasty, {location: 'test.3'})));
gobs.push(new Npc(extend(nasty, {location: 'test.3', attributes: {level: 10}})));

gobs.forEach(function(g) {
    g.save();
});