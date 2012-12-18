// go.js
// the go command takes care of using a direction even if there is a competing command
var Deferred = require('promised-io/promise').Deferred;
exports.command = function (rooms, items, players, npcs, Commands, GameSchema) {

    Commands.alias('exit', 'go');
    Commands.alias('run', 'go');
    Commands.alias('walk', 'go');
    Commands.alias('south', 'go', 'south', "Move in the south direction if there is an exit that way.");
    Commands.alias('north', 'go', 'north');
    Commands.alias('east', 'go', 'east');
    Commands.alias('west', 'go', 'west');
    Commands.alias('up', 'go', 'up');
    Commands.alias('down', 'go', 'down');
    Commands.alias('s', 'south');
    Commands.alias('n', 'north');
    Commands.alias('e', 'east');
    Commands.alias('w', 'west');
    Commands.alias('u', 'up');
    Commands.alias('d', 'down');

    return function(args, player) {
        var exit = args[0];

        var deferred = new Deferred();

        // where are we now?
        GameSchema.room.Room.findOne({location: player.location}, function(err, room) {
            if(err) {
                console.error("ERROR ROOM", err);
                deferred.reject(err);
                return;
            }

            var togo = null;
            room.exits.forEach(function(x) {
                if(x.direction === exit) {
                    togo = x.location;
                }
            });

            if(!togo) {
                player.say("go where?");
                deferred.resolve(true);
                return;
            }

            // move there
            player.location = togo;
            Commands.player_commands.look(null, player);
            room.emit('playerLeave', player);

            deferred.resolve(true);
        });

        return deferred.promise;
    };
};
exports.commandHelp = "Move in the direction of an exit.";