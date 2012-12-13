// goblin.js

var Npc = require('../../src/schema/npc').Npc;

var Goblin = new Npc({
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
});

exports.npc = Goblin;