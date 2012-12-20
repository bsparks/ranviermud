// npc.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    l10n = require('./l10n.js').l10nSchema;

var NpcSchema = new Schema({
    name: { type: String, required: true }, // developer key, this will be the unique "type" like "Goblin"
    title: [l10n], // this will be the duplicatable name, like "Burly Goblin" or "Stalwart Guard"
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
    inventory: [Schema.Types.ObjectId],
    equipment: {type: Schema.Types.Mixed},
    behaviors: [String],
    load_max: {type: Number, "default": 1}
});

NpcSchema.methods.getAttribute = function(key) {
    return this.attributes[key];
};

NpcSchema.methods.getShortDesc = function(locale) {
    return this.shortDescr[0][locale]; // random instead of fixed index?
};

var Npc = mongoose.model('Npc', NpcSchema);

exports.NpcSchema = NpcSchema;
exports.Npc = Npc;