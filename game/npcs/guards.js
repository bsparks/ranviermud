// guards.js

var Npc = require('../../src/schema/npc').Npc;
var extend = require('extend');

var guard = {
    name: 'Guard',
    title: [{
        en: 'Stalwart Guard',
        es: 'ES-Stalwart Guard'
    }],
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
};

var guards = [];
guards.push(new Npc(extend(guard, {location: 'test.1'})));
guards.push(new Npc(extend(guard, {location: 'test.2'})));
guards.push(new Npc(extend(guard, {location: 'test.2', attributes: {level: 5}})));
guards.push(new Npc(extend(guard, {location: 'test.2', attributes: {level: 10}})));

guards.forEach(function(g) {
    g.save();
});