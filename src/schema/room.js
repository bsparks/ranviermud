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
    suggested_range: String
});

AreaSchema.statics.initRooms = function(path) {
    this.rooms = [];

    fs.readdir(path, function(err, files) {
        var room_file,
            room;

        // Load any npc files
        for (var j in files) {
            room_file = path + files[j];
            if (!fs.statSync(room_file).isFile()) continue;
            if (!room_file.match(/js$/)) continue;

            room = require(room_file).room;

            room.area = this._id;

            this.rooms.push(room);
        }
    });
};

var Area = mongoose.model('Area', AreaSchema);

exports.ExitSchema = Exit;
exports.RoomSchema = RoomSchema;
exports.Room = Room;
exports.AreaSchema = AreaSchema;
exports.Area = Area;