// sheet.js

exports.command = function(rooms, items, players, npcs, Commands) {
    return function(args, player) {
        var pc = Commands.player_commands;

        player.say("Character Sheet");
        player.say("===============");

        player.say("Name: " + player.getName());
        player.say("Level " + player.getAttribute('level') + ' ' + player.getAttribute('class'));

        pc.inventory(null, player);
        player.say("---------------");

        pc.equipment(null, player);
    };
};