// room.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    l10n = require('./l10n.js').l10nSchema;

var Exit = new Schema({
    direction: String,
    location: Schema.Types.ObjectId
});

var RoomSchema = new Schema({
    title: { type: String, required: true}, // developer key
    shortDescr: [l10n],
    descr: [l10n],
    exits: [Exit],
    area: Schema.Types.ObjectId,
    script: String
});

var Room = mongoose.model('Room', RoomSchema);

var AreaSchema = new Schema({
    title: String,
    rooms: [RoomSchema]
});

exports.ExitSchema = Exit;
exports.RoomSchema = RoomSchema;
exports.Room = Room;
exports.AreaSchema = AreaSchema;