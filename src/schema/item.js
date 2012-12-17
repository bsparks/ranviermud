// item.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    l10n = require('./l10n.js').l10nSchema,
    fs = require('fs');

var ItemSchema = new Schema({
    location: String, // room it's in if any
    character: Schema.Types.ObjectId,
    title: { type: String, required: true},
    keywords: [l10n],
    shortDescr: [l10n],
    descr: [l10n],
    script: String,
    attributes: {
        wearable: Boolean,
        wear_slot: String,
        wieldable: Boolean,
        edible: Boolean,
        drinkable: Boolean,
        isContainer: Boolean
    }
});

var Item = mongoose.model('Item', ItemSchema);