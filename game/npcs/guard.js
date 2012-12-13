// guard.js

var Npc = require('../../src/schema/npc').Npc;

var Guard = new Npc({
    name: 'Guard',
    keywords: [{
        en: 'guard',
        es: 'guardia'
    },{
        en: 'guardsman',
        es: 'guaria hombre'
    }],
    shortDescr: [{
        en: 'A cityguard keeps watch, standing stoically',
        es: 'Un guardia vigila, de pie estoicamente'
    }],
    description: [{
        en: 'Dressed in militia regalia, the weathered guard eyes you carefully.',
        es: 'ES-Dressed in militia regalia, the weathered guard eyes you carefully.'
    }],
    behaviors: ["rtcombat"],
    attributes: {
        max_health: 80,
        health: 80,
        speed: 2,
        damage: '7-16',
        level: 4,
        experience: 1000
    },
    load_max: 7
});

exports.npc = Guard;