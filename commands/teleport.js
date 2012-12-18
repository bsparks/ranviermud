// teleport.js
// todo: make this have some admin security or something?
exports.command = function (rooms, items, players, npcs, Commands, GameSchema) {
    Commands.alias('port', 'teleport');

    return function(args, player) {
        var exit = args[0];

        GameSchema.room.Room.findOne({location: exit}, function(err, room) {
            if(!room) {
                player.location = 'LIMBO';
            } else {
                player.location = room.location;
            }

            // force a re-look upon change
            Commands.player_commands.look(null, player);
        });
    };
};