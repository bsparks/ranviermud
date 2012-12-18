// say.js

exports.commandName = "/say";
exports.command = function(rooms, items, players, npcs, Commands, GameSchema) {

    Commands.alias('say', '/say');

    return function sayIt(args, player) {
        args = args.join(' ').replace("\033", '');

        players.broadcastAt("<bold><cyan>[say] " + player.getName() + ": " + args + "</cyan></bold>", player);
        players.eachExcept(player, function (p) {
            if (p.getLocation() === player.getLocation()) {
                p.prompt();
            }
        });
    };
};
exports.commandHelp = "Speak something into the current room. No one outside this room will hear.";