var sprintf = require('sprintf').sprintf;
exports.command = function (rooms, items, players, npcs, Commands)
{
	return function (args, player)
	{
		var commands = [];
		var maxlength = 0;
		for (var command in Commands.player_commands) {
			// todo: hide and/or color aliases?
			command += (Commands.player_commands[command].isAlias ? '[A]' : '');
			if (command.length > maxlength) maxlength = command.length;
			commands.push(command);
		}

		commands.sort();

		for (var i = 1; i < commands.length+1; i++) {
			player[i % 5 === 0? 'say' : 'write'](sprintf('%-' + (maxlength + 1) + 's', commands[i-1]));
		}
	};
};
