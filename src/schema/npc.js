// npc.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    l10n = require('./l10n.js').l10nSchema;

var NpcSchema = new Schema({
    name: { type: String, required: true, index: { unique: true} }, // developer key
    keywords: [l10n],
    shortDescr: [l10n],
    descr: [l10n],
    location: {type: String, "default": 'LIMBO'},
    attributes: {
        level: {type: Number, "default": 1},
        health: {type: Number, "default": 1},
        max_health: {type: Number, "default": 1},
        speed: {type: Number, "default": 1},
        experience: {type: Number, "default": 0}
    },
    behaviors: [String],
    load_max: {type: Number, "default": 1}
});

var Npc = mongoose.model('Npc', NpcSchema);

exports.NpcSchema = NpcSchema;
exports.Npc = Npc;