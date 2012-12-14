// room.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    l10n = require('./l10n.js').l10nSchema,
    fs = require('fs');

var Exit = new Schema({
    direction: String,
    location: Number
});

var RoomSchema = new Schema({
    location: Number, // developer key
    title: { type: String, required: true},
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

AreaSchema.methods.initRooms = function(path) {
    var self = this;

    self.rooms = [];


    fs.readdir(path, function(err, files) {
        var room_file,
            room;

        // Load any npc files
        for (var j in files) {
            room_file = path + files[j];
            if (!fs.statSync(room_file).isFile()) continue;
            if (!room_file.match(/js$/)) continue;

            room = require(room_file).room;

            room.area = self._id;

            self.rooms.push(room);
            room.save();
        }

        //console.log(self.title + " ROOMS: ", self.rooms);
    });
};

var Area = mongoose.model('Area', AreaSchema);

exports.ExitSchema = Exit;
exports.RoomSchema = RoomSchema;
exports.Room = Room;
exports.AreaSchema = AreaSchema;
exports.Area = Area;