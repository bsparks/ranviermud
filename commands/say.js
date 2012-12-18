// say.js

exports.commandName = "/say";
exports.command = function(rooms, items, players, npcs, Commands, GameSchema) {
    return function sayIt(args, player) {
        args = args.replace("\033", '');
        players.broadcastAt("<bold><cyan>[say] " + player.getName() + ": " + args + "</cyan></bold>", player);
        players.eachExcept(player, function (p) {
            if (p.getLocation() === player.getLocation()) {
                p.prompt();
            }
        });
    };
};