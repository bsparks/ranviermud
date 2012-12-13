// professions.js
// because class is such a programming word, use profession
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProfessionSchema = new Schema({
    name: String
}, {autoIndex: true});
ProfessionSchema.index({name: 1}, {unique: true});

var Profession = mongoose.model('Profession', ProfessionSchema);

exports.ProfessionSchema = ProfessionSchema;
exports.Profession = Profession;