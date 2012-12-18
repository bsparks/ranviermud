// go.js
// the go command takes care of using a direction even if there is a competing command
exports.command = function (rooms, items, players, npcs, Commands) {

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

        if(!Commands.room_exits(exit, player)) {
            player.say("go where?");
        }
    };
};
exports.commandHelp = "Move in the direction of an exit.";