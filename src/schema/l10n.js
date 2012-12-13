// l10n.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var l10nSchema = new Schema({
    en: String,
    es: String
});

exports.l10nSchema = l10nSchema;